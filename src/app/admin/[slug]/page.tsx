import { notFound } from "next/navigation";
import Script from "next/script";
import About from "@/components/admin/components/About";
import Blog from "@/components/admin/components/Blog";
import Calculators from "@/components/admin/components/Calculators";
import Dashboard from "@/components/admin/components/Dashboard";
import FAQ from "@/components/admin/components/FAQ";
import Quiz from "@/components/admin/components/Quiz";
import SEO from "@/components/admin/components/SEO";
import AsideWrapper from "@/components/admin/components/shared/AsideWrapper";
import Navbar from "@/components/admin/components/shared/Navbar";
import { cookies } from "next/headers";

const SLUG_TO_COMPONENT = {
  dashboard: Dashboard,
  "blog-settings": Blog,
  seo: SEO,
  faq: FAQ,
  about: About,
  calculators: Calculators,
  quiz: Quiz,
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

  const cookieStore = await cookies();
  const token = cookieStore.get("adminAuthToken")?.value;
  if (!token) {
    notFound();
  }
  const Component = normalizedSlug
    ? SLUG_TO_COMPONENT[normalizedSlug]
    : undefined;
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZVQNS9QQHG"
      ></Script>
      <main className="mx-auto w-full ">
        {Component ? (
          <section className="">
            <Navbar />
            <div className="flex-1 flex items-center justify-center">
              <AsideWrapper />
              <Component token={token} />
            </div>
          </section>
        ) : (
          notFound()
        )}
      </main>
    </>
  );
}
