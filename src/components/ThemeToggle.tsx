"use client";

import { HStack, Button, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { colors } from "@/theme/colors";

type ThemePreference = "dark" | "light" | "system";

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const { colorMode, setColorMode } = useColorMode();
  const [preference, setPreference] = useState<ThemePreference>("light");
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  // On mount, read saved preference
  useEffect(() => {
    const saved = localStorage.getItem("rune-theme-preference") as ThemePreference | null;
    if (saved) {
      setPreference(saved);
      if (saved === "system") {
        setColorMode(getSystemTheme());
      } else {
        setColorMode(saved);
      }
    }
  }, [setColorMode]);

  // Listen for system theme changes when in "system" mode
  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setColorMode(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference, setColorMode]);

  const handleSelect = (pref: ThemePreference) => {
    setPreference(pref);
    localStorage.setItem("rune-theme-preference", pref);
    if (pref === "system") {
      setColorMode(getSystemTheme());
    } else {
      setColorMode(pref);
    }
  };

  const options: { label: string; value: ThemePreference }[] = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
    { label: "System", value: "system" },
  ];

  return (
    <HStack
      spacing={0}
      borderRadius="8px"
      border="1px solid"
      borderColor={c.border.subtle}
      overflow="hidden"
      h="28px"
      w="100%"
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          size="xs"
          h="28px"
          flex={1}
          px={3}
          fontSize="11px"
          fontWeight={preference === opt.value ? 600 : 400}
          borderRadius="0"
          bg={
            preference === opt.value
              ? c.overlay.intense
              : "transparent"
          }
          color={
            preference === opt.value
              ? c.text.primary
              : c.text.subtle
          }
          _hover={{
            bg:
              preference === opt.value
                ? c.overlay.intense
                : c.overlay.soft,
          }}
          onClick={() => handleSelect(opt.value)}
          transition="all 0.15s ease"
        >
          {opt.label}
        </Button>
      ))}
    </HStack>
  );
}
