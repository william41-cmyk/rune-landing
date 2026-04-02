import type { Metadata } from "next";
import OpenStudioShell from "./OpenStudioShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://openstudio.gl"),
  title: {
    absolute: "OpenStudio — Beautiful screen recordings that just work",
    template: "%s | OpenStudio",
  },
  description: "Beautiful screen recordings that just work. Native to macOS, simple to use. Record your screen, make it look beautiful, and export.",
  keywords: [
    "screen recording",
    "screen capture",
    "macOS screen recorder",
    "video editing",
    "screen recording software",
    "mac screen recorder",
    "openstudio",
  ],
  authors: [{ name: "OpenStudio", url: "https://openstudio.gl" }],
  creator: "OpenStudio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://openstudio.gl",
    siteName: "OpenStudio",
    title: "OpenStudio — Beautiful screen recordings that just work",
    description: "Native to macOS, simple to use, and just $5 a month. Record your screen, make it look beautiful, and export.",
    images: [
      {
        url: "/openstudio_2.png",
        width: 512,
        height: 512,
        alt: "OpenStudio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenStudio — Beautiful screen recordings that just work",
    description: "Native to macOS, simple to use, and just $5 a month. Record your screen, make it look beautiful, and export.",
    images: ["/openstudio_2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OpenStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OpenStudioShell>{children}</OpenStudioShell>;
}
