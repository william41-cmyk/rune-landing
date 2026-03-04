import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Framework",
  description: "An open source framework for building, chaining, and orchestrating multi-agent workflows in TypeScript.",
  openGraph: {
    type: "website",
    url: "https://rune.gl/framework",
    title: "Rune Framework — Workflow Framework",
    description: "An open source framework for building, chaining, and orchestrating multi-agent workflows in TypeScript.",
    images: [{ url: "/og-framework.png", width: 1920, height: 1080, alt: "Rune Framework" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rune Framework — Workflow Framework",
    description: "An open source framework for building, chaining, and orchestrating multi-agent workflows in TypeScript.",
    images: ["/og-framework.png"],
  },
};

export default function FrameworkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
