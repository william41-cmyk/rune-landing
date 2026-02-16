import type { Metadata } from "next";
import { Providers } from "./providers";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import "@fontsource/jetbrains-mono/400.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rune.gl"),
  title: {
    default: "Rune — Multi-Agent Coding Framework",
    template: "%s | Rune",
  },
  description:
    "Visual multi-agent framework for building custom AI orchestration pipelines to turn your ideas into production-ready code.",
  keywords: [
    "AI coding",
    "multi-agent framework",
    "AI orchestration",
    "code generation",
    "agentic engineering",
    "AI pipeline builder",
    "developer tools",
    "custom ai agents",
    "open source"
  ],
  authors: [{ name: "Rune", url: "https://rune.gl" }],
  creator: "Rune",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rune.gl",
    siteName: "Rune",
    title: "Rune — Multi-Agent Coding Framework",
    description:
      "Visual multi-agent framework for building custom AI orchestration pipelines to turn your ideas into production-ready code.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rune — Agentic Engineering, Simplified",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rune — Multi-Agent Coding Framework",
    description:
      "Visual multi-agent framework for building custom AI orchestration pipelines.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}