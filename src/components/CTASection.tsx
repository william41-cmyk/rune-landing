"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { FiMonitor } from "react-icons/fi";
import { useState, useEffect } from "react";

const SiWindows = FiMonitor;
const SiLinux = FiMonitor;
import DarkVeil from "./DarkVeil";

/* ------------------------------------------------------------------ */
/*  Countdown hook — same UTC target as download page                  */
/* ------------------------------------------------------------------ */

const TARGET = new Date("2026-02-24T01:30:00Z").getTime();

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, ended: diff === 0 };
}

export default function CTASection() {
  const { days, hours, minutes, seconds, ended } = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");

  const tooltipLabel = ended
    ? "Available now"
    : `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

  return (
    <Box
      as="section"
      id="download"
      pt={{ base: "100px", md: "200px" }}
      pb={{ base: "180px", md: "360px" }}
      px={{ base: 5, md: 8 }}
      position="relative"
      overflow="hidden"
    >
      {/* Static DarkVeil background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        w="100%"
        h="100%"
        overflow="hidden"
        pointerEvents="none"
      >
        <DarkVeil
          hueShift={25}
          noiseIntensity={0.03}
          scanlineIntensity={0}
          speed={0}
          scanlineFrequency={0}
          warpAmount={0.3}
          resolutionScale={1.25}
        />
      </Box>

      {/* Top fade */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="300px"
        bg="linear-gradient(to bottom, #171717, transparent)"
        zIndex={1}
        pointerEvents="none"
      />

      {/* Bottom fade */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="300px"
        bg="linear-gradient(to top, #171717, transparent)"
        zIndex={1}
        pointerEvents="none"
      />

      <VStack maxW="700px" mx="auto" spacing={8} position="relative" zIndex={2} textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: "6xl", md: "7xl", lg: "8xl" }}
          fontWeight={700}
          lineHeight={1.05}
          letterSpacing="-0.03em"
          sx={{
            background: "#e6e6e6",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          It just works
        </Heading>

        <Box>
            <Button
              bg="#e6e6e6"
              color="#171717"
              fontWeight={500}
              fontSize="md"
              borderRadius="full"
              px={5}
              h="40px"
              leftIcon={<FiDownload size={14} />}
              isDisabled
              _disabled={{
                bg: "rgba(255,255,255,0.08)",
                color: "gray.500",
                cursor: "not-allowed",
                opacity: 1,
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
