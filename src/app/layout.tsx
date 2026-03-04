import type { Metadata } from "next";
import { Providers } from "./providers";
import { Mona_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rune.gl"),
  title: {
    default: "Rune — The easiest way to build with AI agents",
    template: "%s | Rune",
  },
  description:
    "An open source framework for multi-agent workflows. From idea to production-ready code.",
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
    title: "Rune — The easiest way to build with AI agents",
    description:
      "An open source framework for multi-agent workflows. From idea to production-ready code.",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Rune — The easiest way to build with AI agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rune — The easiest way to build with AI agents",
    description:
      "An open source framework for multi-agent workflows. From idea to production-ready code.",
    images: ["/og-home.png"],
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
    "An open source framework for multi-agent workflows. From idea to production-ready code.",
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
    <html lang="en" className={`${monaSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('rune-theme-preference');var m=p?localStorage.getItem('chakra-ui-color-mode')||'light':'light';if(!p){localStorage.setItem('chakra-ui-color-mode','light')}document.documentElement.style.colorScheme=m;document.documentElement.dataset.theme=m;document.documentElement.classList.add('chakra-ui-'+m);document.documentElement.style.backgroundColor=m==='dark'?'#0e0e0e':'#f6f5f1';document.documentElement.style.color=m==='dark'?'#e5e5e5':'#1a1a1a'}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>

        {/* rune-grab: dev only element grabber */}
        {process.env.NODE_ENV === 'development' && <script src="https://unpkg.com/rune-grab/dist/rune-grab.iife.global.js" />}
      </body>
    </html>
  );
}