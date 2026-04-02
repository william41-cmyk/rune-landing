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


function OpenStudioNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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
            href="#features"
            fontSize="13px"
            color="#6b7280"
            fontWeight="medium"
            _hover={{ color: "#111827" }}
          >
            Features
          </ChakraLink>
          <ChakraLink
            href="#pricing"
            fontSize="13px"
            color="#6b7280"
            fontWeight="medium"
            _hover={{ color: "#111827" }}
          >
            Pricing
          </ChakraLink>
          <ChakraLink
            fontSize="13px"
            color="#6b7280"
            fontWeight="medium"
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

function Hero() {
  return (
    <Box as="section" pt={{ base: 32, md: 44 }} pb={{ base: 12, md: 16 }} px={{ base: 5, md: 8 }}>
      <VStack spacing={6} maxW="600px" mx="auto" textAlign="center">
        <Box
          bg="#0a0a0a"
          borderRadius="full"
          pl={5}
          pr="5px"
          h="40px"
          boxShadow="0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06) inset"
          display="flex"
          alignItems="center"
          gap={4}
          cursor="pointer"
        >
          <Text fontSize="14px" fontWeight="400" color="rgba(255,255,255,0.6)" letterSpacing="-0.01em">
            Download for{" "}
            <Box
              as="span"
              color="white"
              textShadow="0 0 12px rgba(255,255,255,0.6), 0 0 4px rgba(255,255,255,0.3)"
            >
              free
            </Box>
          </Text>
          <Box
            bg="rgba(255,255,255,0.1)"
            borderRadius="full"
            px={3}
            h="30px"
            display="flex"
            alignItems="center"
          >
            <Text fontSize="13px" fontWeight="500" color="white">
              Get
            </Text>
          </Box>
        </Box>

        <Text
        // maxW="400px"
          as="h1"
          fontSize={{ base: "36px", md: "60px" }}
          fontWeight="400"
          color="#111827"
          lineHeight={1}
          letterSpacing="-0.02em"
          overflow="visible"
          px={2}
        >
          Beautiful screen recordings that{" "}
          <Box
            as="span"
            className="os-serif"
            fontWeight="400"
            color="#1a84fe"
            pr="0.1em"
            letterSpacing="-0.05em"
          >
            just work
          </Box>
        </Text>

        <Text
          fontSize="17px"
          fontWeight="500"
          color="#6b7280"
          maxW="520px"
          lineHeight={1.6}
        >
          Native to macOS, simple to use, and just $5 a month.
          Record your screen, make it look beautiful, and export.
        </Text>

        <Box pt={2}>
          <Box
            as={NextLink}
            href="/login"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            bg="#1a84fe"
            color="white"
            fontSize="17px"
            fontWeight="600"
            borderRadius="full"
            h="40px"
            px={8}
            boxShadow="0 12px 24px -4px rgba(26, 132, 254, 0.5), inset 0 1px 0 0 rgba(255,255,255,0.3)"
            position="relative"
            overflow="hidden"
            cursor="pointer"
            textDecoration="none"
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
            Get started
          </Box>
        </Box>

      </VStack>

      <Box
        maxW="960px"
        mx="auto"
        mt={{ base: 12, md: 16 }}
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor="#e2e8f0"
        boxShadow="0 4px 24px rgba(0,0,0,0.06)"
        bg="white"
        position="relative"
        minH={{ base: "240px", md: "480px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="#9ca3af" fontSize="sm">
          app screenshot
        </Text>
      </Box>
    </Box>
  );
}

function BentoCard({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="#e5e7eb"
      borderRadius="16px"
      p={7}
      {...props}
    >
      {children}
    </Box>
  );
}

function Features() {
  return (
    <Box as="section" id="features" py={{ base: 16, md: 28 }} px={{ base: 5, md: 8 }}>
      <VStack spacing={4} mb={{ base: 10, md: 16 }} textAlign="center">
        <Text
          as="h2"
          fontSize={{ base: "32px", md: "60px" }}
          fontWeight="400"
          color="#111827"
          letterSpacing="-0.02em"
        >
          Everything you need
        </Text>
        <Text fontSize="17px" fontWeight="500" color="#6b7280" maxW="480px">
          Record, edit, style, and export — all in one app.
        </Text>
      </VStack>

      <Box maxW="960px" mx="auto">
        <Flex gap={3} mb={3} direction={{ base: "column", md: "row" }}>
          <BentoCard flex={1.2}>
            <Text fontSize="40px" fontWeight="400" color="#111827" lineHeight={1} mb={1}>
              Native
            </Text>
            <Text fontSize="15px" fontWeight="500" color="#9ca3af" mb={5}>
              macOS app
            </Text>
            <Box w="100%" h="1px" bg="#f0f0f0" mb={5} />
            <Text fontSize="15px" fontWeight="500" color="#6b7280" lineHeight={1.7}>
              Built with SwiftUI and ScreenCaptureKit. Fast, lightweight, and feels right at home on your Mac.
            </Text>
          </BentoCard>

          <BentoCard flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box
              w="100%"
              h="160px"
              bg="#f8fafc"
              borderRadius="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="14px" color="#d1d5db">Image</Text>
            </Box>
          </BentoCard>

          <BentoCard flex={1}>
            <Text fontSize="15px" fontWeight="500" color="#6b7280" lineHeight={1.7} mb={6}>
              Record your full screen, a specific window, or a custom area. High quality at native resolution with system audio and microphone.
            </Text>
            <Box w="100%" h="1px" bg="#f0f0f0" mb={5} />
            <Flex align="center" gap={3}>
              <Box w="40px" h="40px" borderRadius="10px" bg="#f8fafc" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                <Text fontSize="14px" color="#d1d5db">img</Text>
              </Box>
              <Box>
                <Text fontSize="14px" fontWeight="600" color="#111827">Screen Recording</Text>
                <Text fontSize="13px" fontWeight="500" color="#1a84fe">One-click capture</Text>
              </Box>
            </Flex>
          </BentoCard>
        </Flex>

        <Flex gap={3} mb={3} direction={{ base: "column", md: "row" }}>
          <BentoCard flex={1}>
            <Text fontSize="15px" fontWeight="500" color="#6b7280" lineHeight={1.7} mb={4}>
              Trim, cut, and arrange segments on a visual timeline. Fade audio and video opacity in and out per segment. Adjust volume with a draggable waveform overlay, and control playback speed — all with undo, redo, and auto-save.
            </Text>
            <Box w="100%" h="1px" bg="#f0f0f0" mb={5} />
            <Flex align="center" gap={3}>
              <Box w="40px" h="40px" borderRadius="10px" bg="#f8fafc" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                <Text fontSize="14px" color="#d1d5db">img</Text>
              </Box>
              <Box>
                <Text fontSize="14px" fontWeight="600" color="#111827">Timeline Editor</Text>
                <Text fontSize="13px" fontWeight="500" color="#1a84fe">Built-in editing</Text>
              </Box>
            </Flex>
          </BentoCard>

          <BentoCard flex={1.2}>
            <Text fontSize="40px" fontWeight="400" color="#111827" lineHeight={1} mb={1}>
              Beautiful
            </Text>
            <Text fontSize="15px" fontWeight="500" color="#9ca3af" mb={5}>
              styling
            </Text>
            <Text fontSize="15px" fontWeight="500" color="#6b7280" lineHeight={1.7}>
              Add backgrounds, padding, rounded corners, and borders. Adjust brightness, contrast, and saturation. Make every recording look polished.
            </Text>
          </BentoCard>

          <BentoCard flex={1} display="flex" flexDirection="column">
            <Box
              w="100%"
              h="160px"
              bg="#f8fafc"
              borderRadius="12px"
              mb={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="14px" color="#d1d5db">Image</Text>
            </Box>
            <Box>
              <Text fontSize="14px" fontWeight="600" color="#111827">Auto Zoom</Text>
              <Text fontSize="13px" fontWeight="500" color="#1a84fe">Focus on what matters</Text>
            </Box>
          </BentoCard>
        </Flex>

        <Flex gap={3} direction={{ base: "column", md: "row" }}>
          <BentoCard flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Text fontSize="40px" fontWeight="400" color="#111827" lineHeight={1} mb={1}>
              $5/mo
            </Text>
            <Text fontSize="15px" fontWeight="500" color="#9ca3af">
              cheapest on the market
            </Text>
          </BentoCard>

          <BentoCard flex={1}>
            <Text fontSize="15px" fontWeight="500" color="#6b7280" lineHeight={1.7} mb={6}>
              Overlay your webcam in a circle or rounded square. Mix system audio and microphone with per-track volume, fade controls, and noise reduction.
            </Text>
            <Box w="100%" h="1px" bg="#f0f0f0" mb={5} />
            <Flex align="center" gap={3}>
              <Box w="40px" h="40px" borderRadius="10px" bg="#f8fafc" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                <Text fontSize="14px" color="#d1d5db">img</Text>
              </Box>
              <Box>
                <Text fontSize="14px" fontWeight="600" color="#111827">Webcam & Audio</Text>
                <Text fontSize="13px" fontWeight="500" color="#1a84fe">Record everything</Text>
              </Box>
            </Flex>
          </BentoCard>

          <BentoCard flex={1.2}>
            <Text fontSize="15px" fontWeight="500" color="#6b7280" lineHeight={1.7} mb={6}>
              Everything renders locally on your Mac. No uploading, no cloud processing. Export as MP4, MOV, or GIF in any resolution up to 4K.
            </Text>
            <Box w="100%" h="1px" bg="#f0f0f0" mb={5} />
            <Flex align="center" gap={3}>
              <Box w="40px" h="40px" borderRadius="10px" bg="#f8fafc" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                <Text fontSize="14px" color="#d1d5db">img</Text>
              </Box>
              <Box>
                <Text fontSize="14px" fontWeight="600" color="#111827">Local Export</Text>
                <Text fontSize="13px" fontWeight="500" color="#1a84fe">100% on your Mac</Text>
              </Box>
            </Flex>
          </BentoCard>
        </Flex>
      </Box>
    </Box>
  );
}

function PricingToggle({ isLifetime, onToggle }: { isLifetime: boolean; onToggle: () => void }) {
  return (
    <HStack spacing={4} justify="center" position="relative" zIndex={1}>
      <Text
        fontSize="15px"
        fontWeight="600"
        color={!isLifetime ? "white" : "rgba(255,255,255,0.4)"}
        transition="color 0.3s"
        cursor="pointer"
        onClick={() => isLifetime && onToggle()}
      >
        Monthly
      </Text>
      <Box
        as="button"
        onClick={onToggle}
        w="72px"
        h="36px"
        borderRadius="full"
        position="relative"
        cursor="pointer"
        overflow="hidden"
        border="1px solid rgba(255,255,255,0.15)"
        boxShadow="0 2px 8px rgba(0,0,0,0.3)"
        flexShrink={0}
      >
        <Box
          position="absolute"
          inset={0}
          bgImage={isLifetime ? "url('/switch-2.png')" : "url('/switch-1.png')"}
          bgSize="cover"
          bgPosition="center"
          transition="opacity 0.3s"
        />
        <Box
          position="absolute"
          top="3px"
          left={isLifetime ? "39px" : "3px"}
          w="28px"
          h="28px"
          borderRadius="full"
          bg="white"
          boxShadow="0 1px 4px rgba(0,0,0,0.3)"
          transition="left 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        />
      </Box>
      <Text
        fontSize="15px"
        fontWeight="600"
        color={isLifetime ? "white" : "rgba(255,255,255,0.4)"}
        transition="color 0.3s"
        cursor="pointer"
        onClick={() => !isLifetime && onToggle()}
      >
        Lifetime
      </Text>
    </HStack>
  );
}

function Pricing() {
  const [isLifetime, setIsLifetime] = useState(false);
  return (
    <Box
      as="section"
      id="pricing"
      py={{ base: 16, md: 28 }}
      px={{ base: 5, md: 8 }}
      bgImage="url('/openstudio-pricing-background.webp')"
      bgSize="cover"
      bgPosition="center"
      borderRadius="3xl"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)"
        zIndex={0}
        pointerEvents="none"
      />
      <VStack spacing={4} mb={{ base: 10, md: 16 }} textAlign="center" position="relative" zIndex={1}>
        <PricingToggle isLifetime={isLifetime} onToggle={() => setIsLifetime(!isLifetime)} />
        <Text
          as="h2"
          fontSize={{ base: "32px", md: "60px" }}
          fontWeight="400"
          color="white"
          letterSpacing="-0.02em"
        >
          Simple pricing
        </Text>
        <Text fontSize="17px" fontWeight="500" color="rgba(255,255,255,0.6)" maxW="380px">
          Start for free. The cheapest screen recording software on the market.
        </Text>
      </VStack>

      <Flex
        maxW="860px"
        mx="auto"
        gap={5}
        direction={{ base: "column", md: "row" }}
        align="stretch"
        position="relative"
        zIndex={1}
      >
        <Box
          flex={1}
          borderRadius="2xl"
          p={0}
          position="relative"
          overflow="hidden"
          bg="rgba(0,0,0,0.35)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.1)"
        >
          <Box p={8} pb={0}>
            <Flex justify="space-between" align="flex-start" mb={4}>
              <Text fontSize="32px" fontWeight="400" color="white">
                Free
              </Text>
              <Text fontSize="32px" fontWeight="400" color="white">
                $0
              </Text>
            </Flex>
            <Text fontSize="15px" fontWeight="500" color="rgba(255,255,255,0.5)" mb={6} lineHeight={1.6}>
              Try OpenStudio with full recording and editing features. Style your videos and preview before upgrading.
            </Text>
            <Box
              as={NextLink}
              href="/login"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              bg="rgba(255,255,255,0.1)"
              border="1px solid rgba(255,255,255,0.15)"
              color="white"
              fontSize="15px"
              fontWeight="600"
              borderRadius="full"
              h="48px"
              w="100%"
              cursor="pointer"
              textDecoration="none"
              transition="all 0.2s"
              boxShadow="inset 0 1px 0 0 rgba(255,255,255,0.1)"
              _hover={{ bg: "rgba(255,255,255,0.18)" }}
            >
              Get Started <Box as="span">&#8594;</Box>
            </Box>
          </Box>

          <Box px={8} pt={6} pb={8}>
            <Box w="100%" h="1px" bg="rgba(255,255,255,0.1)" mb={5} />
            <Text fontSize="13px" fontWeight="600" color="rgba(255,255,255,0.4)" mb={4}>
              Get a feel for OpenStudio.
            </Text>
            <VStack spacing={3} align="stretch">
              {[
                "Record your screen",
                "Full editing & timeline",
                "Custom backgrounds & styling",
                "Auto zoom & annotations",
                "Preview your exports",
                "macOS native app",
              ].map((item) => (
                <HStack key={item} spacing={2.5}>
                  <Text fontSize="14px" color="rgba(255,255,255,0.3)">&#10003;</Text>
                  <Text fontSize="15px" fontWeight="500" color="rgba(255,255,255,0.85)">{item}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Box>

        <Box
          flex={1}
          borderRadius="2xl"
          p={0}
          position="relative"
          overflow="hidden"
          bg="rgba(0,0,0,0.5)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.15)"
        >
          <Box p={8} pb={0}>
            <Flex justify="space-between" align="flex-start" mb={4}>
              <Text fontSize="32px" fontWeight="400" color="white">
                Pro
              </Text>
              <HStack spacing={1}>
                <Text fontSize="32px" fontWeight="400" color="white">
                  {isLifetime ? "$29" : "$5"}
                </Text>
                <Text fontSize="15px" fontWeight="500" color="rgba(255,255,255,0.5)" alignSelf="flex-end" pb={1}>
                  {isLifetime ? "once" : "/mo"}
                </Text>
              </HStack>
            </Flex>
            <Text fontSize="15px" fontWeight="500" color="rgba(255,255,255,0.5)" mb={6} lineHeight={1.6}>
              Unlock exporting and get access to all current and future features.
            </Text>
            <Box
              as={NextLink}
              href="/login"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              bg="white"
              color="#0a0a0a"
              fontSize="15px"
              fontWeight="600"
              borderRadius="full"
              h="48px"
              w="100%"
              cursor="pointer"
              textDecoration="none"
              transition="all 0.2s"
              boxShadow="0 4px 16px rgba(0,0,0,0.3)"
              _hover={{ bg: "rgba(255,255,255,0.9)" }}
            >
             {isLifetime ? "Buy once" : "Get Pro"} <Box as="span">&#8594;</Box>
            </Box>
          </Box>

          <Box px={8} pt={6} pb={8}>
            <Box w="100%" h="1px" bg="rgba(255,255,255,0.1)" mb={5} />
            <Text fontSize="13px" fontWeight="600" color="rgba(255,255,255,0.4)" mb={4}>
              Everything you need to ship.
            </Text>
            <VStack spacing={3} align="stretch">
              {(isLifetime ? [
                "Everything in Free",
                "Export in any resolution",
                "Unlimited exports",
                "Priority support",
                "All future updates",
                "Pay once, own forever",
              ] : [
                "Everything in Free",
                "Export in any resolution",
                "Unlimited exports",
                "Priority support",
                "All future updates",
                "Cancel anytime",
              ]).map((item) => (
                <HStack key={item} spacing={2.5}>
                  <Text fontSize="14px" color="rgba(255,255,255,0.35)">&#10003;</Text>
                  <Text fontSize="15px" fontWeight="600" color="white">{item}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Box>
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

export default function OpenStudioLandingPage() {
  return (
    <Box
      minH="100vh"
      bg="#f8fafc"
      sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}
    >
      <OpenStudioNavbar />
      <Box maxW="1400px" mx="auto">
        <Hero />
        <Features />
        <Pricing />
      </Box>
      <OpenStudioFooter />
    </Box>
  );
}
