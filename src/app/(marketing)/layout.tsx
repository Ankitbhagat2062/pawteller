import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { homepageCms } from "@/lib/cms/homepage";
import { SchemaOrg } from "@/lib/seo-schema";
import { seoDefaults } from "@/lib/cms/seoCms";
import { fetchData } from "@/lib/constant";
import { cookies } from "next/headers";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
export async function generateMetadata(): Promise<Metadata> {
  // Read the token securely from the browser cookies on the server side
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("adminAuthToken")?.value;
  const seo = await fetchData({ pageKey: "home", adminToken: adminToken }) || seoDefaults.home || homepageCms.seo;
  return {
    title:
      seo.title || "Pawteller | Premium Growth & Pet Health Insights",
    // Google site verification
    other: {
      "google-site-verification": "ZyaMR3UjskuwYs7Po4SO9sz0NlVrUcelBO4ED4F1-KA",
    },
    description:
      seo.description ||
      "Accurate dog growth calculators, vet-informed insights, and interactive health tracking features.",
    keywords: seo.keywords || [
      "dog weight calculator",
      "puppy growth chart",
      "dog age quiz",
      "dog food calculator",
      "pet care tips",
    ],
    metadataBase: new URL("https://pawteller.com"),
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MRMZHPN5';
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full font-sans antialiased ${inter.variable}`}
    >
      <head>
        <SchemaOrg />
        {/* 1. Correct Google Tag Manager Script Optimization */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#FDF8F1] dark:bg-zinc-950 bg-linear-to-br from-background via-background to-accent/5 transition-colors duration-300">
        {/* 2. Safe Noscript Iframe for non-JS execution */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRMZHPN5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="flex-1 flex flex-col bg-[#FDF8F1] dark:bg-black">
            {children}
          </div>
          <Toaster />
          <Footer />
        </ThemeProvider>
        <Analytics />
        {GTM_ID && (
          <>
            <Script id="google-analytics" strategy="afterInteractive">
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GTM_ID}');
          `}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
              strategy="afterInteractive"
            />
          </>
        )}
      </body>
    </html>
  );
}
