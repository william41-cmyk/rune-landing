"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import PixelBlast from "./PixelBlast";
import Link from "next/link";
import { colors } from "@/theme/colors";

export default function HeroSection() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      pt={{ base: "120px", md: "180px" }}
      pb={{ base: 28, md: 40 }}
      id="hero"
    >
      <Box position="absolute" inset={0} overflow="hidden" opacity={0.5}>
        <PixelBlast
          pixelSize={4}
          color={c.pixelBlast}
          enableRipples={false}
          speed={0}
          edgeFade={0.5}
          transparent={true}
          timeOffset={349}
        />
      </Box>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="200px"
        bg={`linear-gradient(to bottom, transparent, ${c.bg})`}
        zIndex={1}
        pointerEvents="none"
      />

      {/* Mask for heading */}
      <Box
        position="absolute"
        top="40%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="400px"
        h="25px"
        borderRadius="20px"
        bg={c.bg}
        boxShadow={`0 0 60px 60px ${c.bg}`}
        pointerEvents="none"
        zIndex={1}
      />

      <VStack
        position="relative"
        zIndex={2}
        spacing={5}
        mx="auto"
        px={{ base: 5, md: 8 }}
        textAlign="center"
      >
        <Heading
          as="h2"
          fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
          fontWeight={500}
          lineHeight={1.05}
          letterSpacing="-0.03em"
          maxW="700px"
          sx={{
            background: c.text.primary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Agentic Engineering, Simplified
        </Heading>

        <VStack spacing={3} mt={2}>
          <Link href="/download" passHref>
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
              _hover={{
                bg: isDark ? "#222222" : "#eeede9",
                boxShadow: isDark
                  ? "0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)"
                  : "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
              }}
              _active={{ bg: isDark ? "#2a2a2a" : "#e8e7e3" }}
              transition="all 0.2s"
            >
              Download Now
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}
