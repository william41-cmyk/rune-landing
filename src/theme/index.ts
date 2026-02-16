import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fontSizes: {
    "2xs": "11px",   // pill text, platform labels
    xs: "12px",      // copyright, mono node labels
    sm: "13px",      // footer links, small UI text
    md: "14px",      // buttons, nav links, card body
    lg: "15px",      // descriptions, detail text
    xl: "16px",      // card titles, body text (mobile)
    "2xl": "18px",   // logo, mode descriptions
    "3xl": "20px",   // subheadings, body text (desktop)
    "3.5xl": "22px",
    "4xl": "32px",   // section headings (mobile)
    "5xl": "36px",   // CTA heading (mobile)
    "6xl": "44px",   // hero heading (mobile)
    "7xl": "48px",   // section headings (desktop)
    "8xl": "55px",   // hero heading (desktop)
    "9xl": "56px",   // CTA heading (desktop)
    "10xl": "64px",  // hero heading (tablet)
  },
  fonts: {
    heading: `'Ubuntu', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    body: `'Ubuntu', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    mono: `'JetBrains Mono', ui-monospace, "SF Mono", Menlo, Monaco, monospace`,
  },
  colors: {
    gray: {
      50: "#e6e6e6",
      100: "#e5e5e5",
      200: "#d4d4d4",
      300: "#a3a3a3",
      400: "#737373",
      500: "#525252",
      600: "#404040",
      700: "#333333",
      800: "#262626",
      900: "#1c1c1c",
      950: "#0d0d0d",
    },
    brand: {
      bg: "#171717",
      surface: "#161616",
      surfaceLight: "#1c1c1c",
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "#171717",
        color: "gray.50",
        scrollBehavior: "smooth",
      },
      "::selection": {
        bg: "rgba(168, 85, 247, 0.3)",
        color: "white",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: "12px",
        transition: "all 0.2s ease",
      },
    },
  },
});

export default theme;
