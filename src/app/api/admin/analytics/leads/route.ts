import { NextResponse } from "next/server";
import { z } from "zod";

import connectDB from "@/lib/mongodb";
import SubscriberModel from "@/models/subscriber";
import QuizModel from "@/models/quiz";
import ContactModel from "@/models/contact";

import { verifyAdminToken } from "@/lib/admin/adminAuth";


const LeadStatusSchema = z.enum(["subscriber", "non-subscriber"]);

const LeadsListItemSchema = z.object({
  email: z.string().email(),
  name: z.string().nullable().optional(),
  status: LeadStatusSchema,
  // Explicitly include verification state so the admin UI / KPIs
  // don't assume all subscribers are verified.
  isVerified: z.boolean(),
  sources: z.array(z.enum(["quiz", "contact", "newsletter"])),
  lastActiveAt: z.string(),
  joinedAt: z.string(),
});

const GrowthBucketSchema = z.object({
  period: z.enum(["weekly", "monthly"]),
  // ISO yyyy-mm-dd (bucket start)
  buckets: z
    .array(
      z.object({
        startDate: z.string(),
        newLeads: z.number().int(),
      }),
    )
    .default([]),
});

const SegmentationDataSchema = z.object({
  topContactTopics: z.array(
    z.object({
      topic: z.string(),
      count: z.number().int(),
    }),
  ),
  topQuizBreedMatches: z.array(
    z.object({
      breed: z.string(),
      count: z.number().int(),
    }),
  ),
});

const AnalyticsResponseSchema = z.object({
  totalUniqueLeads: z.number().int(),
  growthStats: z.array(GrowthBucketSchema),
  leadsList: z.array(LeadsListItemSchema),
  segmentationData: SegmentationDataSchema,
});

type AnalyticsResponse = z.infer<typeof AnalyticsResponseSchema>;

function toISO(d: Date) {
  return d.toISOString();
}

function bucketKey(date: Date, period: "weekly" | "monthly") {
  const d = new Date(date);
  d.setSeconds(0, 0);

  if (period === "monthly") {
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01`;
  }

  // weekly (Mon start) in UTC
  const day = d.getUTCDay(); // 0=Sun..6=Sat
  const diffToMon = (day + 6) % 7; // Mon =>0, Sun=>6
  d.setUTCDate(d.getUTCDate() - diffToMon);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function parseBucketStartFromKey(period: "weekly" | "monthly", key: string) {
  if (period === "monthly") {
    return new Date(`${key}T00:00:00.000Z`);
  }
  return new Date(`${key}T00:00:00.000Z`);
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")?.trim() ?? "";

  if (!authHeader) {
    return NextResponse.json({ ok: false, error: "Missing auth token" }, { status: 401 });
  }

  const authResult = await verifyAdminToken(authHeader);

  if (!authResult.ok) {
    return NextResponse.json(
      { error: `Verification failed: ${authResult.reason}` },
      { status: 401 }
    );
  }

  // Proceed with your MongoDB aggregation logic safely...
  try {
    await connectDB();

    const [subscribers, quizzes, contacts] = await Promise.all([

      SubscriberModel.find(
        {},
        { email: 1, isVerified: 1, createdAt: 1 } as any,
      ).lean(),
      QuizModel.find(
        {},
        { email: 1, quizId: 1, results: 1, createdAt: 1 } as any,
      ).lean(),
      ContactModel.find(
        {},
        { name: 1, email: 1, topic: 1, createdAt: 1 } as any,
      ).lean(),
    ]);


    const subscriberByEmail = new Map<string, { isVerified: boolean; createdAt?: Date }>();
    for (const s of subscribers) {
      if (!s?.email) continue;
      subscriberByEmail.set(s.email.toLowerCase(), {
        isVerified: !!s.isVerified,
        createdAt: s.createdAt ? new Date(s.createdAt) : undefined,
      });
    }

    type Acc = {
      email: string;
      name: string | null;
      sources: Set<"quiz" | "contact" | "newsletter">;
      lastActiveAt: Date;
      joinedAt: Date;
      // for KPI calculations
      hadQuiz: boolean;
      hadContact: boolean;
    };

    const accByEmail = new Map<string, Acc>();

    const ensureAcc = (email: string) => {
      const key = email.toLowerCase();
      const existing = accByEmail.get(key);
      if (existing) return existing;
      // placeholder dates; will be corrected
      const now = new Date(0);
      const created = new Date(0);
      const a: Acc = {
        email: key,
        name: null,
        sources: new Set(),
        lastActiveAt: now,
        joinedAt: created,
        hadQuiz: false,
        hadContact: false,
      };
      accByEmail.set(key, a);
      return a;
    };

    // Subscribers => newsletter source
    for (const s of subscribers) {
      if (!s?.email) continue;
      const email = s.email.toLowerCase();
      const a = ensureAcc(email);
      a.sources.add("newsletter");
      if (a.lastActiveAt.getTime() === 0) a.lastActiveAt = s.createdAt ? new Date(s.createdAt) : new Date();
      const joined = s.createdAt ? new Date(s.createdAt) : new Date();
      a.joinedAt = a.joinedAt.getTime() === 0 ? joined : new Date(Math.min(a.joinedAt.getTime(), joined.getTime()));
    }

    // Quizzes => quiz source + name from results.userName
    for (const q of quizzes) {
      if (!q?.email) continue;
      const email = q.email.toLowerCase();
      const a = ensureAcc(email);
      a.sources.add("quiz");
      a.hadQuiz = true;

      const createdAt = q.createdAt ? new Date(q.createdAt) : new Date();
      a.lastActiveAt = a.lastActiveAt.getTime() ? new Date(Math.max(a.lastActiveAt.getTime(), createdAt.getTime())) : createdAt;
      a.joinedAt = a.joinedAt.getTime() ? new Date(Math.min(a.joinedAt.getTime(), createdAt.getTime())) : createdAt;

      const userName = (q.results as any)?.userName;
      if (typeof userName === "string" && userName.trim()) {
        a.name = a.name ?? userName.trim();
      }
    }

    // Contacts => contact source + topic aggregation
    const topicCount = new Map<string, number>();

    for (const c of contacts) {
      if (!c?.email) continue;
      const email = c.email.toLowerCase();
      const a = ensureAcc(email);
      a.sources.add("contact");
      a.hadContact = true;

      const createdAt = c.createdAt ? new Date(c.createdAt) : new Date();
      a.lastActiveAt = a.lastActiveAt.getTime() ? new Date(Math.max(a.lastActiveAt.getTime(), createdAt.getTime())) : createdAt;
      a.joinedAt = a.joinedAt.getTime() ? new Date(Math.min(a.joinedAt.getTime(), createdAt.getTime())) : createdAt;

      if (typeof c.name === "string" && c.name.trim()) {
        a.name = a.name ?? c.name.trim();
      }

      if (typeof c.topic === "string" && c.topic.trim()) {
        const t = c.topic.trim();
        topicCount.set(t, (topicCount.get(t) ?? 0) + 1);
      }
    }

    // Breed match aggregation
    const breedCount = new Map<string, number>();
    for (const q of quizzes) {
      if (!q?.results?.topMatches) continue;
      for (const m of q.results.topMatches as any[]) {
        const breed = m?.breed;
        if (!breed || typeof breed !== "string") continue;
        const b = breed.trim();
        if (!b) continue;
        breedCount.set(b, (breedCount.get(b) ?? 0) + 1);
      }
    }

    // Growth buckets based on joinedAt (first active lead)
    const leads = Array.from(accByEmail.values());

    const growthBuckets = (period: "weekly" | "monthly") => {
      if (leads.length === 0) return [] as Array<{ startDate: string; newLeads: number }>;

      const dates = leads
        .map((l) => l.joinedAt)
        .filter(Boolean)
        .sort((a, b) => a.getTime() - b.getTime());
      if (dates.length === 0) return [];

      const latest = dates[dates.length - 1];

      // Normalize the cutoff to the first bucket boundary so we don't partially exclude leads
      // that fall in the earliest bucket.
      const earliestRaw = new Date(latest);
      if (period === "monthly") earliestRaw.setUTCMonth(earliestRaw.getUTCMonth() - 5);
      else earliestRaw.setUTCDate(earliestRaw.getUTCDate() - 42);

      const earliestBoundaryKey = bucketKey(earliestRaw, period);
      const earliestBoundary = parseBucketStartFromKey(period, earliestBoundaryKey);

      const bucketMap = new Map<string, number>();
      for (const l of leads) {
        const d = l.joinedAt;
        if (d < earliestBoundary) continue;
        const key = bucketKey(d, period);
        bucketMap.set(key, (bucketMap.get(key) ?? 0) + 1);
      }

      const keys = Array.from(bucketMap.keys())
        .map((k) => parseBucketStartFromKey(period, k).getTime())
        .sort((a, b) => a - b);

      const out: Array<{ startDate: string; newLeads: number }> = [];
      for (const t of keys) {
        const startDate = new Date(t);
        const key = bucketKey(startDate, period);
        out.push({ startDate: startDate.toISOString(), newLeads: bucketMap.get(key) ?? 0 });
      }
      return out;
    };

    const leadsList = leads.map((l) => {
      const subscriber = subscriberByEmail.get(l.email);
      const status: "subscriber" | "non-subscriber" = subscriber ? "subscriber" : "non-subscriber";
      return {
        email: l.email,
        name: l.name,
        status,
        // Preserve explicit subscriber verification state from source data.
        isVerified: subscriber ? subscriber.isVerified : false,
        sources: Array.from(l.sources),
        lastActiveAt: toISO(l.lastActiveAt),
        joinedAt: toISO(l.joinedAt),
      };
    });

    const topContactTopics = Array.from(topicCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([topic, count]) => ({ topic, count }));

    const topQuizBreedMatches = Array.from(breedCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([breed, count]) => ({ breed, count }));

    const payload: AnalyticsResponse = {
      totalUniqueLeads: accByEmail.size,
      growthStats: [
        { period: "weekly", buckets: growthBuckets("weekly") },
        { period: "monthly", buckets: growthBuckets("monthly") },
      ],
      leadsList,
      segmentationData: {
        topContactTopics,
        topQuizBreedMatches,
      },
    };

    // Validate structure before returning
    const parsed = AnalyticsResponseSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid analytics payload", issues: parsed.error.issues },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed.data, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load leads analytics";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

