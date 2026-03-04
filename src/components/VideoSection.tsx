"use client";

import { Box, Text, VStack, useColorMode } from "@chakra-ui/react";
import { colors } from "@/theme/colors";

export default function VideoSection() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  return (
    <Box as="section" pt={0} pb={{ base: 10, md: 16 }} px={{ base: 5, md: 8 }}>
      <VStack justify="center" align="center">
        <Text
                letterSpacing="-0.03em"
          fontSize={{ base: "lg", md: "1xl", lg: "3.5xl" }}
          color={c.text.secondary}
          fontWeight={500}
          lineHeight={1.3}
          textAlign="center"
          maxW="850px"
        >
          Build, run, and manage multi-agent workflows from a single desktop app.
        </Text>
        <Box
          w="100%"
          maxW="960px"
          borderRadius="12px"
          border="1px solid"
          borderColor={c.border.subtle}
          overflow="hidden"
          bg="#000"
          boxShadow={c.shadow.card}
        >
          <Box
            as="video"
            src="/showcase.mp4"
            autoPlay
            loop
            muted
            playsInline
            w="100%"
            h="auto"
            display="block"
            sx={{
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </Box>
      </VStack>
    </Box>
  );
}
