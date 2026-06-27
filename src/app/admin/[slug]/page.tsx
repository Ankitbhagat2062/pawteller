import { notFound } from "next/navigation";

import About from "@/components/admin/components/About";
import Blog from "@/components/admin/components/Blog";
import Calculators from "@/components/admin/components/Calculators";
import Dashboard from "@/components/admin/components/Dashboard";
import FAQ from "@/components/admin/components/FAQ";
import Quiz from "@/components/admin/components/Quiz";
import SEO from "@/components/admin/components/SEO";
import AsideWrapper from "@/components/admin/components/shared/AsideWrapper";
import Navbar from "@/components/admin/components/shared/Navbar";

import AdminSlugClient from "./AdminSlugClient";
import { LoginRegisterSplit } from "@/components/admin/LoginRegisterSplit";
import { cookies } from "next/headers";
import Settings from "@/components/admin/components/Settings";
import Account from "@/components/admin/components/Account";
import Analytics from "@/components/admin/components/Analytics";

const SLUG_TO_COMPONENT = {
  admin: LoginRegisterSplit,
  dashboard: Dashboard,
  "blog-settings": Blog,
  seo: SEO,
  faq: FAQ,
  about: About,
  calculators: Calculators,
  quiz: Quiz,
  settings: Settings,
  account: Account,
  analytics:Analytics,
} as const;

type ComponentSlug = keyof typeof SLUG_TO_COMPONENT;

type PageProps = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = slug?.toLowerCase() as ComponentSlug | undefined;

  if (!normalizedSlug || !(normalizedSlug in SLUG_TO_COMPONENT)) {
    notFound();
  }

  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get("adminAuthToken")?.value;
  return (
    <main className="mx-auto w-full ">
      <section className=" flex flex-col items-start">
        <Navbar />
        <div className="flex-1 w-full flex items-start">
          <div className="w-1/5">
            <AsideWrapper />
          </div>
          <div className="w-4/5">
            <AdminSlugClient
              tokenFromServer={tokenFromCookie}
              normalizedSlug={normalizedSlug}
              componentMap={SLUG_TO_COMPONENT}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

