import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Rune for macOS, Windows, and Linux.",
  openGraph: {
    type: "website",
    url: "https://rune.gl/download",
    title: "Download Rune",
    description: "Download Rune for macOS, Windows, and Linux.",
    images: [{ url: "/og-download.png", width: 1920, height: 1080, alt: "Download Rune" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Rune",
    description: "Download Rune for macOS, Windows, and Linux.",
    images: ["/og-download.png"],
  },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
