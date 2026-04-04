"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { supabase } from "@/lib/supabase";

const CURRENT_VERSION = "0.1.0";
const CURRENT_BUILD = "1";
const CURRENT_DATE = "April 4, 2026";
const DMG_URL = "https://releases.openstudio.gl/OpenStudio-0.1.0.dmg";
const MIN_MACOS = "14.0";

const RELEASE_NOTES: {
  version: string;
  build: string;
  date: string;
  url: string;
  current?: boolean;
  notes: string[];
}[] = [
  {
    version: "0.1.0",
    build: "1",
    date: "April 4, 2026",
    url: DMG_URL,
    current: true,
    notes: [
      "Record full screen, window, or custom area at native resolution",
      "System audio and microphone capture with per-track volume",
      "Webcam overlay in circle or rounded square",
      "Timeline editor with trim, cut, and segment arrangement",
      "Audio fade in/out and video opacity controls",
      "Adjustable playback speed with undo, redo, and auto-save",
      "Custom backgrounds, padding, rounded corners, and borders",
      "Brightness, contrast, and saturation adjustments",
      "Auto zoom to focus on what matters",
      "Export to MP4, MOV, or GIF up to 4K",
      "Built with SwiftUI and ScreenCaptureKit",
    ],
  },
];

function OpenStudioNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Box
      as="nav"
      position="fixed"
      top={4}
      left="50%"
      transform="translateX(-50%)"
      zIndex={100}
      w={{ base: "calc(100% - 32px)", md: "auto" }}
      minW={{ md: "600px" }}
      maxW="720px"
    >
      <Flex
        bg="rgba(255, 255, 255, 0.85)"
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor="#e2e8f0"
        borderRadius="full"
        px={5}
        h="48px"
        align="center"
        justify="space-between"
        boxShadow="0 2px 12px rgba(0,0,0,0.06)"
      >
        <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          <HStack spacing={2}>
            <Image
              src="/openstudio_2.png"
              alt="OpenStudio"
              boxSize="26px"
              borderRadius="6px"
            />
            <Text fontSize="sm" fontWeight="bold" color="#111827">
              OpenStudio
            </Text>
          </HStack>
        </ChakraLink>

        <HStack spacing={5} display={{ base: "none", md: "flex" }}>
          <ChakraLink
            as={NextLink}
            href="/#features"
            fontSize="13px"
            color="#6b7280"
            fontWeight="medium"
            _hover={{ color: "#111827" }}
          >
            Features
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/#pricing"
            fontSize="13px"
            color="#6b7280"
            fontWeight="medium"
            _hover={{ color: "#111827" }}
          >
            Pricing
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/download"
            fontSize="13px"
            color="#111827"
            fontWeight="semibold"
            _hover={{ color: "#111827" }}
          >
            Download
          </ChakraLink>
        </HStack>

        <HStack spacing={2}>
          {isLoggedIn ? (
            <Button
              as={NextLink}
              href="/account"
              bg="#111827"
              color="white"
              fontSize="13px"
              fontWeight="medium"
              _hover={{ bg: "#1f2937" }}
              size="sm"
              borderRadius="full"
              h="32px"
              px={4}
              boxShadow="inset 0 1px 0 0 rgba(255,255,255,0.25)"
            >
              Account
            </Button>
          ) : (
            <>
              <Button
                as={NextLink}
                href="/login"
                variant="ghost"
                fontSize="13px"
                fontWeight="medium"
                color="#374151"
                _hover={{ bg: "rgba(0,0,0,0.04)" }}
                size="sm"
                borderRadius="full"
                h="32px"
              >
                Login
              </Button>
              <Button
                as={NextLink}
                href="/signup"
                bg="#111827"
                color="white"
                fontSize="13px"
                fontWeight="medium"
                _hover={{ bg: "#1f2937" }}
                size="sm"
                borderRadius="full"
                h="32px"
                px={4}
                boxShadow="inset 0 1px 0 0 rgba(255,255,255,0.25)"
              >
                Sign Up
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

function OpenStudioFooter() {
  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="#e2e8f0"
      py={8}
      px={{ base: 5, md: 8 }}
    >
      <Flex
        maxW="1100px"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={4}
      >
        <HStack spacing={2.5}>
          <Image
            src="/openstudio_2.png"
            alt="OpenStudio"
            boxSize="24px"
            borderRadius="6px"
          />
          <Text fontSize="15px" fontWeight="500" color="#6b7280">
            © {new Date().getFullYear()} OpenStudio by{" "}
            <ChakraLink
              href="https://rune.gl"
              isExternal
              color="#6b7280"
              _hover={{ color: "#111827" }}
            >
              Rune
            </ChakraLink>
          </Text>
        </HStack>
        <HStack spacing={6}>
          <ChakraLink
            as={NextLink}
            href="/privacy"
            fontSize="15px"
            fontWeight="500"
            color="#6b7280"
            _hover={{ color: "#111827" }}
          >
            Privacy
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/terms"
            fontSize="15px"
            fontWeight="500"
            color="#6b7280"
            _hover={{ color: "#111827" }}
          >
            Terms
          </ChakraLink>
          <ChakraLink
            as={NextLink}
            href="/refund"
            fontSize="15px"
            fontWeight="500"
            color="#6b7280"
            _hover={{ color: "#111827" }}
          >
            Refunds
          </ChakraLink>
          <ChakraLink
            href="https://x.com/openstudiodotgl"
            isExternal
            fontSize="15px"
            fontWeight="500"
            color="#6b7280"
            _hover={{ color: "#111827" }}
          >
            X
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
}

export default function DownloadPage() {
  return (
    <Box
      minH="100vh"
      bg="#f8fafc"
      sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}
    >
      <OpenStudioNavbar />

      <Box maxW="700px" mx="auto" pt={{ base: 32, md: 40 }} pb={20} px={{ base: 5, md: 8 }}>
        <VStack spacing={4} textAlign="center" mb={12}>
          <Image
            src="/openstudio-IOS.png"
            alt="OpenStudio"
            boxSize="72px"
            borderRadius="16px"
            boxShadow="0 4px 24px rgba(0,0,0,0.08)"
          />
          <Text
            fontSize={{ base: "32px", md: "44px" }}
            fontWeight="400"
            color="#111827"
            letterSpacing="-0.03em"
            lineHeight="1.1"
          >
            Download OpenStudio
          </Text>
          <Text fontSize="17px" fontWeight="500" color="#6b7280" maxW="420px">
            Free for macOS. Universal build for Apple Silicon and Intel.
          </Text>
        </VStack>

        <Box
          bg="white"
          border="1px solid"
          borderColor="#e5e7eb"
          borderRadius="20px"
          p={{ base: 6, md: 8 }}
          mb={6}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "center" }}
            justify="space-between"
            gap={6}
          >
            <VStack align={{ base: "center", md: "flex-start" }} spacing={2}>
              <HStack spacing={3}>
                <Text fontSize="22px" fontWeight="600" color="#111827">
                  OpenStudio {CURRENT_VERSION}
                </Text>
                <Box
                  bg="#1a84fe"
                  borderRadius="full"
                  px={2.5}
                  py={0.5}
                >
                  <Text fontSize="11px" fontWeight="600" color="white">
                    Latest
                  </Text>
                </Box>
              </HStack>
              <Text fontSize="14px" color="#9ca3af" fontWeight="500">
                Released {CURRENT_DATE} · Build {CURRENT_BUILD} · macOS {MIN_MACOS}+
              </Text>
            </VStack>

            <ChakraLink
              href={DMG_URL}
              _hover={{ textDecoration: "none" }}
              flexShrink={0}
            >
              <Box
                as="button"
                bg="#1a84fe"
                color="white"
                fontSize="14px"
                fontWeight="600"
                borderRadius="full"
                h="38px"
                px={5}
                display="flex"
                alignItems="center"
                gap={2}
                boxShadow="0 12px 24px -4px rgba(26, 132, 254, 0.5), inset 0 1px 0 0 rgba(255,255,255,0.3)"
                position="relative"
                overflow="hidden"
                _active={{ transform: "scale(0.98)" }}
                transition="transform 0.1s"
                sx={{
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: "100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    transition: "right 0.4s ease",
                  },
                  "&:hover::before": {
                    right: "-100%",
                  },
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download .dmg
              </Box>
            </ChakraLink>
          </Flex>

          <Box w="100%" h="1px" bg="#f1f5f9" my={6} />

          <Text fontSize="13px" fontWeight="600" color="#9ca3af" textTransform="uppercase" letterSpacing="0.05em" mb={3}>
            What&apos;s new
          </Text>
          <VStack align="stretch" spacing={2}>
            {RELEASE_NOTES[0].notes.map((note) => (
              <HStack key={note} spacing={2.5} align="flex-start">
                <Text fontSize="14px" color="#d1d5db" mt="1px">•</Text>
                <Text fontSize="14px" fontWeight="500" color="#374151">{note}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {RELEASE_NOTES.length > 1 && (
          <Box mt={12}>
            <Text fontSize="13px" fontWeight="600" color="#9ca3af" textTransform="uppercase" letterSpacing="0.05em" mb={4}>
              Previous versions
            </Text>
            <VStack spacing={3} align="stretch">
              {RELEASE_NOTES.filter((r) => !r.current).map((release) => (
                <Flex
                  key={release.version}
                  bg="white"
                  border="1px solid"
                  borderColor="#e5e7eb"
                  borderRadius="14px"
                  px={6}
                  py={4}
                  align="center"
                  justify="space-between"
                >
                  <VStack align="flex-start" spacing={0.5}>
                    <Text fontSize="15px" fontWeight="600" color="#111827">
                      Version {release.version}
                    </Text>
                    <Text fontSize="13px" color="#9ca3af" fontWeight="500">
                      {release.date} · Build {release.build}
                    </Text>
                  </VStack>
                  <ChakraLink
                    href={release.url}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Box
                      as="button"
                      bg="#f1f5f9"
                      color="#374151"
                      fontSize="13px"
                      fontWeight="600"
                      borderRadius="full"
                      h="34px"
                      px={4}
                      display="flex"
                      alignItems="center"
                      transition="all 0.2s"
                      _hover={{ bg: "#e2e8f0" }}
                    >
                      Download
                    </Box>
                  </ChakraLink>
                </Flex>
              ))}
            </VStack>
          </Box>
        )}

        <Box textAlign="center" mt={10}>
          <Text fontSize="13px" color="#9ca3af" fontWeight="500">
            Requires macOS {MIN_MACOS} (Sonoma) or later
          </Text>
        </Box>
      </Box>

      <OpenStudioFooter />
    </Box>
  );
}
