import type { Metadata } from "next";
import { Providers } from "./providers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  metadataBase: new URL("https://rune.gl"),
  title: {
    default: "Rune â€” Multi-Agent Coding Framework",
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
    title: "Rune â€” Multi-Agent Coding Framework",
    description:
      "Visual multi-agent framework for building custom AI orchestration pipelines to turn your ideas into production-ready code.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rune â€” Agentic Engineering, Simplified",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rune â€” Multi-Agent Coding Framework",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rune",
  url: "https://rune.gl",
  description:
    "Visual multi-agent framework for building custom AI orchestration pipelines to turn your ideas into production-ready code.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Windows, Linux",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "Rune",
    url: "https://rune.gl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}