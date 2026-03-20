"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { FiCpu, FiCrosshair, FiArrowRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelBlast from "@/components/PixelBlast";
import BinaryField from "@/components/BinaryField";
import ProductCard from "@/components/ProductCard";
import { colors } from "@/theme/colors";

export default function Home() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  return (
    <Box as="main" minH="100vh" bg={c.bg} overflowX="hidden">
      <Box
        maxW="1200px"
        mx="auto"
        position="relative"
        borderLeft="1px dashed"
        borderRight="1px dashed"
        borderColor={c.border.subtle}
      >
        <Navbar />

        {/* ── Hero ─────────────────────────────────────────────── */}
        <Box as="section" position="relative" minH="720px" overflow="hidden">
          <Box position="absolute" inset={0} overflow="hidden">
            <PixelBlast
              pixelSize={4}
              color={c.pixelBlast}
              enableRipples={false}
              speed={0.1}
              edgeFade={0.5}
              transparent={true}
            />
          </Box>

          {/* Mask for heading */}
          <Box
            position="absolute"
            top="44%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="400px"
            h="70px"
            borderRadius="20px"
            bg={c.bg}
            boxShadow={`0 0 60px 60px ${c.bg}`}
            pointerEvents="none"
            zIndex={1}
          />
          {/* Mask for subtitle */}
          <Box
            position="absolute"
            top="60%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="420px"
            h="25px"
            borderRadius="16px"
            bg={c.bg}
            boxShadow={`0 0 50px 50px ${c.bg}`}
            pointerEvents="none"
            zIndex={1}
          />

          <Flex
            position="relative"
            zIndex={2}
            direction="column"
            align="center"
            justify="center"
            minH="670px"
            pt="140px"
            pb="100px"
            px={{ base: 5, md: 8 }}
          >
            <VStack spacing={5} textAlign="center">
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
                fontWeight={500}
                lineHeight={1.05}
                letterSpacing="-0.03em"
                pb="0.1em"
                maxW="500px"
                sx={{
                  background: c.text.primary,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Agentic tools for <Box as="span" fontWeight={700}>every</Box> engineer
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "1xl", lg: "3xl" }}
                color={c.text.secondary}
                fontWeight={500}
                lineHeight={1.3}
                letterSpacing="-0.03em"
                maxW="480px"
              >
                AI is <Box as="span" fontWeight={700}>changing</Box> how software gets built. Rune is <Box as="span" fontWeight={700}>building</Box> the toolkit to make that shift feel <Box as="span" fontWeight={700}>natural</Box>.
              </Text>
            </VStack>
          </Flex>

          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            h="120px"
            bg={`linear-gradient(to bottom, transparent, ${c.bg})`}
            zIndex={3}
            pointerEvents="none"
          />
        </Box>

        {/* ── Products ─────────────────────────────────────────── */}
        <Box as="section" px={{ base: 5, md: 8 }} py={{ base: 16, md: 28 }}>
          <Box maxW="1100px" mx="auto">
            <Flex
              gap={{ base: 8, lg: 10 }}
              direction={{ base: "column", lg: "row" }}
              align={{ base: "center", lg: "stretch" }}
            >
              {/* Left text — vertically centered with the grid */}
              <Flex
                flex="0 0 auto"
                w={{ base: "full", lg: "320px" }}
                align="center"
              >
                <VStack
                  spacing={4}
                  align={{ base: "center", lg: "start" }}
                  textAlign={{ base: "center", lg: "left" }}
                >
                  <Heading
                    as="h2"
                    fontSize={{ base: "3xl", md: "4xl", lg: "4xl" }}
                    fontWeight={600}
                    letterSpacing="-0.02em"
                    lineHeight={1}
                    color={c.text.primary}
                  >
                    Build with Rune
                  </Heading>
                  <Text
                    fontSize={{ base: "lg", md: "1xl", lg: "3xl" }}
                    color={c.text.secondary}
                    fontWeight={500}
                    lineHeight={1.3}
                  >
                    Modular tools that work together. Pick what you need, leave the rest. We're building the toolkit we wished existed.
                  </Text>
                </VStack>
              </Flex>

              {/* Right grid — 3×3 with bottom mask */}
              <Box position="relative" flex={1}>
                <SimpleGrid columns={{ base: 2, md: 2, lg: 3 }} spacing={3} w="full">
                  <ProductCard
                    name="Rune Code"
                    description="A desktop app for building and running multi-agent workflows."
                    href="/code"
                    img="/rune-logo.webp"
                  />
                  <ProductCard
                    name="Rune Grab"
                    description="Point at any element, grab its context, and send it anywhere."
                    href="/grab"
                    img="/rune-grab-logo.webp"
                  />
                  <ProductCard
                    name="Hugr"
                    description="An open source framework for multi-agent workflows."
                    href="/hugr"
                    placeholder="?"
                  />
                  <ProductCard
                    name="Rune Bench"
                    description="Evaluate and benchmark agents across real-world tasks."
                    locked
                  />
                  <ProductCard
                    name="Rune Deploy"
                    description="One-command deployment for agentic services."
                    locked
                  />
                  <ProductCard
                    name="Rune Shield"
                    description="Runtime guardrails and observability for agents."
                    locked
                  />
                  <ProductCard
                    name="Rune Trace"
                    description="End-to-end tracing and replay for multi-agent conversations."
                    locked
                  />
                  <ProductCard
                    name="Rune Hub"
                    description="A shared registry for reusable agent templates."
                    locked
                  />
                  <ProductCard
                    name="Rune Test"
                    description="Automated testing for validating agentic behaviour."
                    locked
                  />
                </SimpleGrid>

                {/* Gradient mask over bottom row */}
                <Box
                  position="absolute"
                  bottom={-1}
                  left={0}
                  right={0}
                  h="35%"
                  bg={isDark
                    ? "linear-gradient(to bottom, transparent 0%, #0e0e0e 95%)"
                    : "linear-gradient(to bottom, transparent 0%, #f6f5f1 95%)"
                  }
                  pointerEvents="none"
                  zIndex={2}
                />
                {/* Explore button */}
                <Flex
                  justify="center"
                  mt={4}
                  position="relative"
                  zIndex={3}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    color={c.text.subtle}
                    fontWeight={500}
                    fontSize="sm"
                    _hover={{ color: c.text.primary }}
                    transition="all 0.2s"
                  >
                    Explore all products
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* ── Philosophy───────────────────────────────────────── */}
        <Box as="section" px={{ base: 5, md: 8 }} py={{ base: 20, md: 36 }}>
          <VStack spacing={5} maxW="520px" mx="auto" textAlign="center">
            <Text
              fontSize={{ base: "lg", md: "2xl", lg: "4xl" }}
              fontWeight={500}
              color={c.text.secondary}
              lineHeight={1.4}
            >
              We build tools that work for <Box as="span" fontWeight={700}>you</Box>. Every Rune project is open source,
              designed to work with any provider, and focused on one thing — making
              AI feel <Box as="span" fontWeight={700}>effortless</Box>.
            </Text>
          </VStack>
        </Box>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <Box
          as="section"
          pt={{ base: "140px", md: "250px" }}
          pb={{ base: "140px", md: "250px" }}
          px={{ base: 5, md: 8 }}
          position="relative"
          overflow="hidden"
        >
          <BinaryField color={c.pixelBlast} />
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

          {/* Mask for heading */}
          <Box
            position="absolute"
            top="46%"
            left="50%"
            transform="translate(-50%, -60%)"
            w="450px"
            h="10px"
            borderRadius="20px"
            bg={c.bg}
            boxShadow={`0 0 60px 60px ${c.bg}`}
            pointerEvents="none"
            zIndex={1}
          />

          <VStack maxW="700px" mx="auto" spacing={6} position="relative" zIndex={2} textAlign="center">
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
              Open source, always
            </Heading>
            <HStack spacing={3}>
              <Button
                as="a"
                href="https://github.com/orgs/RuneLtd/repositories"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                bg={c.btn.bg}
                color={c.btn.text}
                fontWeight={500}
                fontSize="sm"
                borderRadius="full"
                px={5}
                leftIcon={<FaGithub size={14} />}
                rightIcon={
                  <Box
                    as={FiArrowRight}
                    size="14px"
                    transition="transform 0.2s"
                    sx={{ ".group:hover &": { transform: "translateX(2px) translateY(-2px) rotate(-45deg)" } }}
                  />
                }
                role="group"
                className="group"
                _hover={{ bg: c.btn.hover }}
                _active={{ bg: c.btn.active }}
                transition="all 0.2s"
              >
                Star
              </Button>
            </HStack>
          </VStack>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
