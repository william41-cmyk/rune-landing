import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hugr",
  description: "An open source framework for building and chaining multi-agent workflows in TypeScript.",
  openGraph: {
    type: "website",
    url: "https://rune.gl/hugr",
    title: "Hugr — Multi-agent Workflow Framework",
    description: "An open source framework for building and chaining multi-agent workflows in TypeScript.",
    images: [{ url: "/og-framework.png", width: 1920, height: 1080, alt: "Hugr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugr — Multi-agent Workflow Framework",
    description: "An open source framework for building and chaining multi-agent workflows in TypeScript.",
    images: ["/og-framework.png"],
  },
};

export default function HugrLayout({ children }: { children: React.ReactNode }) {
  return children;
}
