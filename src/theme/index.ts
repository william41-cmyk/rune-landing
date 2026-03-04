import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { palette } from "./colors";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fontSizes: {
    "2xs": "11px",
    xs: "12px",
    sm: "13px",
    md: "14px",
    lg: "15px",
    xl: "16px",
    "2xl": "18px",
    "3xl": "20px",
    "3.5xl": "24px",
    "4xl": "32px",
    "5xl": "36px",
    "6xl": "44px",
    "7xl": "48px",
    "8xl": "55px",
    "9xl": "56px",
    "10xl": "64px",
  },
  fonts: {
    heading: `var(--font-mona-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    body: `var(--font-mona-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    mono: `var(--font-geist-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace`,
  },
  colors: {
    gray: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0a0a0a",
    },
    brand: {
      bg: palette.light.bg,
      surface: palette.light.surface,
      surfaceLight: palette.light.surfaceLight,
    },
  },
  semanticTokens: {
    colors: {
      "rune.bg": {
        default: palette.light.bg,
        _dark: palette.dark.bg,
      },
      "rune.surface": {
        default: palette.light.surface,
        _dark: palette.dark.surface,
      },
      "rune.surfaceLight": {
        default: palette.light.surfaceLight,
        _dark: palette.dark.surfaceLight,
      },
      "rune.text.primary": {
        default: palette.lightText.primary,
        _dark: palette.darkText.primary,
      },
      "rune.text.secondary": {
        default: palette.lightText.secondary,
        _dark: palette.darkText.secondary,
      },
      "rune.text.muted": {
        default: palette.lightText.muted,
        _dark: palette.darkText.muted,
      },
      "rune.text.subtle": {
        default: palette.lightText.subtle,
        _dark: palette.darkText.subtle,
      },
      "rune.text.placeholder": {
        default: palette.lightText.placeholder,
        _dark: palette.darkText.placeholder,
      },
      "rune.border.subtle": {
        default: palette.lightBorder.subtle,
        _dark: palette.darkBorder.subtle,
      },
      "rune.border.default": {
        default: palette.lightBorder.default,
        _dark: palette.darkBorder.default,
      },
      "rune.border.strong": {
        default: palette.lightBorder.strong,
        _dark: palette.darkBorder.strong,
      },
      "rune.overlay.subtle": {
        default: palette.lightOverlay.subtle,
        _dark: palette.darkOverlay.subtle,
      },
      "rune.overlay.soft": {
        default: palette.lightOverlay.soft,
        _dark: palette.darkOverlay.soft,
      },
      "rune.overlay.hover": {
        default: palette.lightOverlay.hover,
        _dark: palette.darkOverlay.hover,
      },
      "rune.overlay.strong": {
        default: palette.lightOverlay.strong,
        _dark: palette.darkOverlay.strong,
      },
      "rune.selection": {
        default: palette.lightSelection,
        _dark: palette.darkSelection,
      },
      "rune.btn.primary.bg": {
        default: palette.lightBtn.bg,
        _dark: palette.darkBtn.bg,
      },
      "rune.btn.primary.text": {
        default: palette.lightBtn.text,
        _dark: palette.darkBtn.text,
      },
      "rune.btn.secondary.bg": {
        default: palette.light.surface,
        _dark: palette.dark.surface,
      },
      "rune.btn.secondary.text": {
        default: palette.lightText.primary,
        _dark: palette.darkText.primary,
      },
      "rune.btn.secondary.border": {
        default: palette.lightBorder.subtle,
        _dark: palette.darkBorder.subtle,
      },
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      "html, body": {
        bg: props.colorMode === "dark" ? palette.dark.bg : palette.light.bg,
        color: props.colorMode === "dark" ? palette.darkText.primary : palette.lightText.primary,
        scrollBehavior: "smooth",
      },
      "::selection": {
        bg: props.colorMode === "dark" ? palette.darkSelection : palette.lightSelection,
        color: props.colorMode === "dark" ? palette.darkText.primary : palette.lightText.primary,
      },
    }),
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
