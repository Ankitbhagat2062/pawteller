"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Mail,
  Search,
  Users,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAdminToken from "@/hooks/token";

type LeadSource = "newsletter" | "quiz" | "contact_form";

interface UnifiedLead {
  email: string;
  fullName?: string;
  isNewsletterSubscriber: boolean;
  isVerifiedSubscriber: boolean;
  sources: LeadSource[];
  quizzesTaken: Array<{
    quizId: string;
    completedAt: string;
    topBreedMatch: string;
  }>;
  contactSubmissions: Array<{
    topic: string;
    message: string;
    createdAt: string;
  }>;
  lastActiveAt: string;
}

type LeadsListItem = {
  email: string;
  name?: string | null;
  status: "subscriber" | "non-subscriber";
  sources: Array<"quiz" | "contact" | "newsletter">;
  lastActiveAt: string;
  joinedAt: string;
};

type AnalyticsResponse = {
  totalUniqueLeads: number;
  leadsList: LeadsListItem[];
};

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: { leads: UnifiedLead[]; totalUniqueLeads: number } };

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function normalizeSources(raw: LeadsListItem["sources"]): LeadSource[] {
  const out = new Set<LeadSource>();
  for (const s of raw) {
    if (s === "newsletter") out.add("newsletter");
    if (s === "quiz") out.add("quiz");
    if (s === "contact") out.add("contact_form");
  }
  return Array.from(out);
}

function mapLeads(raw: LeadsListItem[]): UnifiedLead[] {
  return raw.map((l) => {
    const sources = normalizeSources(l.sources);

    // API response does not include quizId / contact message/topic arrays.
    // We still conform to the required UnifiedLead structure.
    // If/when backend expands those fields, the mapping can be enhanced.
    const isNewsletterSubscriber = sources.includes("newsletter");
    const isVerifiedSubscriber = isNewsletterSubscriber && l.status === "subscriber";

    return {
      email: l.email,
      fullName: l.name ?? undefined,
      isNewsletterSubscriber,
      isVerifiedSubscriber,
      sources,
      quizzesTaken: [],
      contactSubmissions: [],
      lastActiveAt: l.lastActiveAt,
    };
  });
}

function sourceBadgeTone(source: LeadSource): "default" | "secondary" | "outline" {
  if (source === "quiz") return "default";
  if (source === "newsletter") return "secondary";
  return "outline";
}

function sourceBadgeText(source: LeadSource) {
  if (source === "contact_form") return "Contact Form";
  if (source === "newsletter") return "Newsletter";
  return "Quiz";
}

export default function Analytics() {
  const [fetchState, setFetchState] = useState<FetchState>({ status: "loading" });
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | LeadSource>("all");
  const { adminAuthToken } = useAdminToken();
  useEffect(() => {
    let cancelled = false;
    async function run() {
      setFetchState({ status: "loading" });
      if (!adminAuthToken) return;
      try {
        const res = await axios.get<AnalyticsResponse>(
          "/api/admin/analytics/leads",
          {
            headers: {
              // Attaches the token as a Bearer token or direct token depending on your API setup
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );

        if (cancelled) return;

        const leads = mapLeads(res.data.leadsList ?? []);
        setFetchState({
          status: "success",
          data: {
            leads,
            totalUniqueLeads: res.data.totalUniqueLeads ?? leads.length,
          },
        });
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Failed to load analytics";
        setFetchState({ status: "error", message });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [adminAuthToken]);

  const { leads, kpis } = useMemo((): {
    leads: UnifiedLead[];
    kpis: {
      totalUniqueLeads: number;
      totalVerifiedSubscribers: number;
      quizTakers: number;
      contactSubmissions: number;
    };
  } => {
    if (fetchState.status !== "success") {
      return {
        leads: [],
        kpis: {
          totalUniqueLeads: 0,
          totalVerifiedSubscribers: 0,
          quizTakers: 0,
          contactSubmissions: 0,
        },
      };
    }

    const leadsData = fetchState.data.leads;
    const totalVerifiedSubscribers = leadsData.filter((l) => l.isVerifiedSubscriber).length;
    const quizTakers = leadsData.filter((l) => l.sources.includes("quiz")).length;
    const contactSubmissions = leadsData.filter((l) => l.sources.includes("contact_form")).length;

    return {
      leads: leadsData,
      kpis: {
        totalUniqueLeads: fetchState.data.totalUniqueLeads,
        totalVerifiedSubscribers,
        quizTakers,
        contactSubmissions,
      },
    };
  }, [fetchState]);

  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();

    return leads.filter((l) => {
      if (sourceFilter !== "all" && !l.sources.includes(sourceFilter)) return false;
      if (!q) return true;

      const name = (l.fullName ?? "").toLowerCase();
      const email = l.email.toLowerCase();
      return email.includes(q) || name.includes(q);
    });
  }, [leads, query, sourceFilter]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3Icon />
            Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-62.5">
          {fetchState.status === "loading" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {new Array(4).fill(0).map((_, idx) => (
                <KpiSkeleton key={idx} />
              ))}
            </div>
          ) : fetchState.status === "error" ? (
            <Alert variant="destructive">
              <AlertTitle>Failed to load analytics</AlertTitle>
              <AlertDescription>{fetchState.message}</AlertDescription>
            </Alert>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                icon={<Users className="h-4 w-4" />}
                label="Total Unique Leads"
                value={kpis.totalUniqueLeads}
              />
              <KpiCard
                icon={<CheckCircle2 className="h-4 w-4" />}
                label="Total Verified Subscribers"
                value={kpis.totalVerifiedSubscribers}
              />
              <KpiCard
                icon={<Mail className="h-4 w-4" />}
                label="Quiz Takers"
                value={kpis.quizTakers}
              />
              <KpiCard
                icon={<Clock className="h-4 w-4" />}
                label="Contact Form Submissions"
                value={kpis.contactSubmissions}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Lead Directory</CardTitle>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-70">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Search by name or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={sourceFilter} onValueChange={(v) => setSourceFilter(v as any)}>
              <SelectTrigger className="w-full sm:w-50">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sources</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="contact_form">Contact Form</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="min-h-62.5">
          {fetchState.status === "loading" ? (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-55">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Subscription Status</TableHead>
                    <TableHead>Last Active Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {new Array(8).fill(0).map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Skeleton className="h-4 w-35" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-50" />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-5 w-22.5" />
                          <Skeleton className="h-5 w-22.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-35" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : fetchState.status === "error" ? (
            <Alert variant="destructive">
              <AlertTitle>Couldn’t load the lead directory</AlertTitle>
              <AlertDescription>{fetchState.message}</AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-55">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Subscription Status</TableHead>
                  <TableHead>Last Active Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center">
                      No leads match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads
                    .slice()
                    .sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime())
                    .map((l) => (
                      <TableRow key={l.email}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {l.fullName?.trim() ? l.fullName : "—"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {l.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {l.sources
                              .slice()
                              .sort((a, b) => (a > b ? 1 : -1))
                              .map((s) => (
                                <Badge key={s} variant={sourceBadgeTone(s)}>
                                  {sourceBadgeText(s)}
                                </Badge>
                              ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {l.isVerifiedSubscriber ? (
                            <Badge variant="default">Verified Subscriber</Badge>
                          ) : l.isNewsletterSubscriber ? (
                            <Badge variant="secondary">Newsletter Subscriber</Badge>
                          ) : (
                            <Badge variant="outline">Non-Subscriber</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(l.lastActiveAt)}</div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold leading-none">{value}</p>
        </div>
        <div className="rounded-md border bg-background p-2 text-muted-foreground">{icon}</div>
      </div>
    </div>
  );
}

function KpiSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-30" />
        </div>
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
}

function BarChart3Icon() {
  // Reuse lucide icons already in dependencies; keep this minimal.
  // Using inline component avoids importing a second large icon set.
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground">
      <Users className="h-4 w-4" />
    </span>
  );
}

