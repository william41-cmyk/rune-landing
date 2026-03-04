import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rune Code",
  description: "Agentic engineering, simplified. A desktop app for building and running multi-agent workflows.",
  openGraph: {
    type: "website",
    url: "https://rune.gl/code",
    title: "Rune Code — Agentic Engineering, Simplified",
    description: "A desktop app for building and running multi-agent workflows.",
    images: [{ url: "/og-code.png", width: 1920, height: 1080, alt: "Rune Code" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rune Code — Agentic Engineering, Simplified",
    description: "A desktop app for building and running multi-agent workflows.",
    images: ["/og-code.png"],
  },
};

export default function CodeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
