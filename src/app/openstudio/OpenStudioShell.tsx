"use client";

import { Box } from "@chakra-ui/react";

export default function OpenStudioShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap');

        .os-page {
          font-family: -apple-system, 'SF Pro Display', 'SF Pro', system-ui, BlinkMacSystemFont, sans-serif;
        }

        .os-serif {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
        }
      `}</style>
      <Box className="os-page">{children}</Box>
    </>
  );
}
