import type { Metadata } from "next";
import { Providers } from "./providers";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import "@fontsource/jetbrains-mono/400.css";

export const metadata: Metadata = {
  title: "Rune — Multi-Agent Coding Framework",
  description:
    "Rune orchestrates three specialized AI agents — Architect, Coder, and Raven — in an iterative loop to turn your ideas into production-ready code.",
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
