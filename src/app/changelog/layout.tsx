import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "All the latest updates and improvements to Rune. See what's new in the latest release.",
  openGraph: {
    type: "website",
    url: "https://rune.gl/changelog",
    title: "Changelog | Rune",
    description:
      "All the latest updates and improvements to Rune. See what's new in the latest release.",
    images: [
      {
        url: "/og-changelog.png",
        width: 1200,
        height: 630,
        alt: "Rune Changelog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog | Rune",
    description:
      "All the latest updates and improvements to Rune. See what's new in the latest release.",
    images: ["/og-changelog.png"],
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
