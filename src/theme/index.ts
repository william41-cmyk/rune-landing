import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fontSizes: {
    "2xs": "11px",
    xs: "12px",
    sm: "13px",
    md: "14px",
    lg: "15px",
    xl: "16px",
    "2xl": "18px",
    "3xl": "20px",
    "3.5xl": "22px",
    "4xl": "32px",
    "5xl": "36px",
    "6xl": "44px",
    "7xl": "48px",
    "8xl": "55px",
    "9xl": "56px",
    "10xl": "64px",
  },
  fonts: {
    heading: `var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    body: `var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    mono: `var(--font-geist-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace`,
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
        bg: "rgba(255, 255, 255, 0.2)",
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