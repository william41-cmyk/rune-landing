import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rune Grab",
  description: "Grab UI context for AI. Screenshot and reference any element on screen.",
  openGraph: {
    type: "website",
    url: "https://rune.gl/grab",
    title: "Rune Grab — Grab UI context for AI",
    description: "Screenshot and reference any element on screen.",
    images: [{ url: "/og-grab.png", width: 1920, height: 1080, alt: "Rune Grab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rune Grab — Grab UI context for AI",
    description: "Screenshot and reference any element on screen.",
    images: ["/og-grab.png"],
  },
};

export default function GrabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
