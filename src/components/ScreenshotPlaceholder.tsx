"use client";

import { Box, Text, Flex, useColorMode } from "@chakra-ui/react";
import { colors } from "@/theme/colors";

interface ScreenshotPlaceholderProps {
  label: string;
  height?: string;
  fadeBottom?: boolean;
}

export default function ScreenshotPlaceholder({
  label,
  height = "500px",
  fadeBottom = false,
}: ScreenshotPlaceholderProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  return (
    <Box position="relative" w="100%" maxW="1100px" mx="auto">
      <Box
        h={height}
        bg={
          isDark
            ? `linear-gradient(145deg, ${c.surface} 0%, ${c.surfaceTertiary} 100%)`
            : `linear-gradient(145deg, ${c.surfaceLight} 0%, ${c.surface} 100%)`
        }
        border="1px solid"
        borderColor={c.border.subtle}
        borderRadius="16px"
        boxShadow={
          isDark
            ? `0 0 80px rgba(168, 85, 247, 0.05), 0 20px 60px rgba(0,0,0,0.3)`
            : `0 0 80px rgba(168, 85, 247, 0.05), 0 20px 60px rgba(0,0,0,0.06)`
        }
        overflow="hidden"
        position="relative"
      >
        <Flex
          h="40px"
          bg={c.overlay.subtle}
          borderBottom="1px solid"
          borderColor={c.border.faint}
          align="center"
          px={4}
          gap={2}
        >
          <Box w="12px" h="12px" borderRadius="full" bg={c.border.subtle} />
          <Box w="12px" h="12px" borderRadius="full" bg={c.border.subtle} />
          <Box w="12px" h="12px" borderRadius="full" bg={c.border.subtle} />
        </Flex>
        <Flex
          h="calc(100% - 40px)"
          align="center"
          justify="center"
          position="relative"
          sx={{
            backgroundImage: isDark
              ? "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)"
              : "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            w="200px"
            bg={c.overlay.subtle}
            borderRight="1px solid"
            borderColor={c.border.veryFaint}
          >
            {[...Array(8)].map((_, i) => (
              <Box
                key={i}
                h="28px"
                mx={3}
                my={2}
                borderRadius="4px"
                bg={i === 2 ? c.overlay.hover : c.overlay.subtle}
              />
            ))}
          </Box>
          <Flex direction="column" align="center" gap={3}>
            <Box
              w="48px"
              h="48px"
              borderRadius="12px"
              bg="rgba(168, 85, 247, 0.08)"
              border="1px solid"
              borderColor="rgba(168, 85, 247, 0.15)"
            />
            <Text
              color={c.text.subtle}
              fontSize="sm"
              fontFamily="mono"
              fontWeight={500}
              letterSpacing="0.05em"
            >
              {label}
            </Text>
          </Flex>
        </Flex>
      </Box>
      {fadeBottom && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="120px"
          bg={`linear-gradient(to bottom, transparent, ${c.bg})`}
          borderRadius="0 0 16px 16px"
          pointerEvents="none"
        />
      )}
    </Box>
  );
}
