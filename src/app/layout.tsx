import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";
import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { SchemaOrg } from "@/lib/seo-schema";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
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

export const metadata: Metadata = {
  title: "Pawteller | Premium Growth & Pet Health Insights",
  // Google site verification
  other: {
    "google-site-verification": "ZyaMR3UjskuwYs7Po4SO9sz0NlVrUcelBO4ED4F1-KA",
  },
  description:
    "Accurate dog growth calculators, vet-informed insights, and interactive health tracking features.",
  keywords: ['dog weight calculator', 'puppy growth chart', 'dog age quiz', 'dog food calculator', 'pet care tips'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full font-sans antialiased ${inter.variable}`}
    >
      <head>
        <SchemaOrg />
      </head>
      <body className="flex min-h-full flex-col bg-[#FDF8F1] dark:bg-zinc-950 bg-linear-to-br from-background via-background to-accent/5 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="flex-1 flex flex-col bg-[#FDF8F1] dark:bg-black">
            {children}
          </div>
          <Toaster />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
