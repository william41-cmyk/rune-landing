/**
 * Global color definitions for Rune.
 * Change colors here and they propagate everywhere.
 *
 * Usage:
 *   import { colors } from "@/theme/colors";
 *   const c = colors(isDark);
 *   <Box bg={c.bg} color={c.text.primary} />
 */

const palette = {
  // ── Core backgrounds ──────────────────────────────────
  dark: {
    bg: "#0e0e0e",
    surface: "#1a1a1a",
    surfaceLight: "#222222",
    surfaceTertiary: "#141414",
  },
  light: {
    bg: "#f6f5f1",
    surface: "#f5f4f2",
    surfaceLight: "#ffffff",
    surfaceTertiary: "#f5f4f2",
  },

  // ── Core text ─────────────────────────────────────────
  darkText: {
    primary: "#ffffff",
    secondary: "#b0b0b0",
    muted: "#888888",
    subtle: "#666666",
    placeholder: "#444444",
    faint: "#555555",
    inactive: "#999999",
  },
  lightText: {
    primary: "#000000",
    secondary: "#404040",
    muted: "#737373",
    subtle: "#a3a8a7",
    placeholder: "#d4d3cf",
    faint: "#a3a8a7",
    inactive: "#666666",
  },

  // ── Borders (opacity-based) ───────────────────────────
  darkBorder: {
    subtle: "rgba(255,255,255,0.08)",
    default: "rgba(255,255,255,0.12)",
    strong: "rgba(255,255,255,0.2)",
    faint: "rgba(255,255,255,0.06)",
    veryFaint: "rgba(255,255,255,0.05)",
  },
  lightBorder: {
    subtle: "rgba(0,0,0,0.08)",
    default: "rgba(0,0,0,0.12)",
    strong: "rgba(0,0,0,0.2)",
    faint: "rgba(0,0,0,0.06)",
    veryFaint: "rgba(0,0,0,0.05)",
  },

  // ── Overlays ──────────────────────────────────────────
  darkOverlay: {
    subtle: "rgba(255,255,255,0.02)",
    soft: "rgba(255,255,255,0.03)",
    hover: "rgba(255,255,255,0.06)",
    medium: "rgba(255,255,255,0.04)",
    strong: "rgba(255,255,255,0.08)",
    intense: "rgba(255,255,255,0.1)",
  },
  lightOverlay: {
    subtle: "rgba(0,0,0,0.02)",
    soft: "rgba(0,0,0,0.03)",
    hover: "rgba(0,0,0,0.06)",
    medium: "rgba(0,0,0,0.04)",
    strong: "rgba(0,0,0,0.08)",
    intense: "rgba(0,0,0,0.1)",
  },

  // ── Primary button ────────────────────────────────────
  darkBtn: {
    bg: "#ffffff",
    text: "#0e0e0e",
    hover: "#e0e0e0",
    active: "#cccccc",
  },
  lightBtn: {
    bg: "#000000",
    text: "#f6f5f1",
    hover: "#1c1c1c",
    active: "#333333",
  },

  // ── Shadows ───────────────────────────────────────────
  darkShadow: {
    card: "0 8px 32px rgba(0,0,0,0.3)",
    dropdown: "0 8px 32px rgba(0,0,0,0.3)",
  },
  lightShadow: {
    card: "0 8px 32px rgba(0,0,0,0.06)",
    dropdown: "0 8px 32px rgba(0,0,0,0.06)",
  },

  // ── Selection ─────────────────────────────────────────
  darkSelection: "rgba(255, 255, 255, 0.15)",
  lightSelection: "rgba(0, 0, 0, 0.12)",

  // ── Effects ───────────────────────────────────────────
  pixelBlast: "#686868",
};

/**
 * Returns theme-aware colors based on isDark flag.
 *
 * Example:
 *   const c = colors(isDark);
 *   c.bg         → "#0e0e0e" or "#f6f5f1"
 *   c.text.primary → "#ffffff" or "#000000"
 *   c.border.subtle → "rgba(255,255,255,0.08)" or "rgba(0,0,0,0.08)"
 */
export function colors(isDark: boolean) {
  return {
    // Backgrounds
    bg: isDark ? palette.dark.bg : palette.light.bg,
    surface: isDark ? palette.dark.surface : palette.light.surface,
    surfaceLight: isDark ? palette.dark.surfaceLight : palette.light.surfaceLight,
    surfaceTertiary: isDark ? palette.dark.surfaceTertiary : palette.light.surfaceTertiary,

    // Text
    text: {
      primary: isDark ? palette.darkText.primary : palette.lightText.primary,
      secondary: isDark ? palette.darkText.secondary : palette.lightText.secondary,
      muted: isDark ? palette.darkText.muted : palette.lightText.muted,
      subtle: isDark ? palette.darkText.subtle : palette.lightText.subtle,
      placeholder: isDark ? palette.darkText.placeholder : palette.lightText.placeholder,
      faint: isDark ? palette.darkText.faint : palette.lightText.faint,
      inactive: isDark ? palette.darkText.inactive : palette.lightText.inactive,
    },

    // Borders
    border: {
      subtle: isDark ? palette.darkBorder.subtle : palette.lightBorder.subtle,
      default: isDark ? palette.darkBorder.default : palette.lightBorder.default,
      strong: isDark ? palette.darkBorder.strong : palette.lightBorder.strong,
      faint: isDark ? palette.darkBorder.faint : palette.lightBorder.faint,
      veryFaint: isDark ? palette.darkBorder.veryFaint : palette.lightBorder.veryFaint,
    },

    // Overlays
    overlay: {
      subtle: isDark ? palette.darkOverlay.subtle : palette.lightOverlay.subtle,
      soft: isDark ? palette.darkOverlay.soft : palette.lightOverlay.soft,
      hover: isDark ? palette.darkOverlay.hover : palette.lightOverlay.hover,
      medium: isDark ? palette.darkOverlay.medium : palette.lightOverlay.medium,
      strong: isDark ? palette.darkOverlay.strong : palette.lightOverlay.strong,
      intense: isDark ? palette.darkOverlay.intense : palette.lightOverlay.intense,
    },

    // Buttons
    btn: {
      bg: isDark ? palette.darkBtn.bg : palette.lightBtn.bg,
      text: isDark ? palette.darkBtn.text : palette.lightBtn.text,
      hover: isDark ? palette.darkBtn.hover : palette.lightBtn.hover,
      active: isDark ? palette.darkBtn.active : palette.lightBtn.active,
    },

    // Shadows
    shadow: {
      card: isDark ? palette.darkShadow.card : palette.lightShadow.card,
      dropdown: isDark ? palette.darkShadow.dropdown : palette.lightShadow.dropdown,
    },

    // Selection
    selection: isDark ? palette.darkSelection : palette.lightSelection,

    // Effects
    pixelBlast: palette.pixelBlast,
  };
}

export { palette };
export default colors;
