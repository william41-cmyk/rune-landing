"use client";

import {
  Box,
  Heading,
  VStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { colors } from "@/theme/colors";
import DotMatrixField from "@/components/DotMatrixField";

export default function CTASection() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  return (
    <Box
      as="section"
      id="download"
      mt={{ base: "60px", md: "100px" }}
      minH={{ base: "500px", md: "700px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 5, md: 8 }}
      position="relative"
      overflow="hidden"
    >
      <DotMatrixField color={c.pixelBlast} />

      {/* Top gradient fade */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="300px"
        bg={`linear-gradient(to bottom, ${c.bg}, transparent)`}
        zIndex={1}
        pointerEvents="none"
      />

      {/* Bottom gradient fade */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="300px"
        bg={`linear-gradient(to top, ${c.bg}, transparent)`}
        zIndex={1}
        pointerEvents="none"
      />

      <VStack maxW="700px" mx="auto" spacing={8} position="relative" zIndex={2} textAlign="center">
        <Heading
          as="h2"
          fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
          fontWeight={500}
          lineHeight={1.2}
          letterSpacing="-0.03em"
          sx={{
            background: c.text.primary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          It just works
        </Heading>

        <Box>
          <Button
            bg={c.surface}
            color={c.text.primary}
            fontWeight={500}
            fontSize="md"
            borderRadius="full"
            px={5}
            h="40px"
            border="1px solid"
            borderColor={c.border.subtle}
            boxShadow={
              isDark
                ? "0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
                : "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
            }
            leftIcon={<FiDownload size={14} />}
            isDisabled
            _disabled={{
              bg: c.overlay.medium,
              color: c.text.subtle,
              cursor: "not-allowed",
              opacity: 1,
              border: "1px solid",
              borderColor: c.border.faint,
              boxShadow: "none",
            }}
            transition="all 0.2s"
          >
            Star on Github
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
