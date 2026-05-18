import type { Metadata } from "next";
import PrivacyPage from "@/components/shared/Privacy";

// 1. GENERATE PERFECT 100/100 SEO METADATA
export const metadata: Metadata = {
  title: "Privacy Policy | pawteller",
  description: "Learn how pawteller handles, processes, and protects your personal data. Read our comprehensive security guidelines and data disclosure terms.",
  alternates: {
    canonical: "https://pawteller.com/privacy", // Adjust with your production URL structure
  },
};

export default function Privacy() {
  return <PrivacyPage />;
}