"use client";

import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    Code,
    Button,
    Flex,
    Badge,
    Image,
} from "@chakra-ui/react";
import {
    FiArrowLeft,
    FiCopy,
    FiTerminal,
} from "react-icons/fi";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkVeil from "@/components/DarkVeil";

/* ── Demo wrapper components ─────────────────────────────────────────────
   These exist purely so rune-grab's fiber walker finds named components
   with displayNames that survive minification. Each one renders its
   children directly (via fragment) so it adds zero DOM nodes.           */

const AgentCard = ({ children }: { children: React.ReactNode }) => <>{children}</>;
AgentCard.displayName = "AgentCard";

const StatusBadge = ({ children }: { children: React.ReactNode }) => <>{children}</>;
StatusBadge.displayName = "StatusBadge";

const PromptInput = ({ children }: { children: React.ReactNode }) => <>{children}</>;
PromptInput.displayName = "PromptInput";

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function GrabPage() {

    return (
        <Box minH="100vh" bg="#171717" overflowX="hidden">
            <Script
                src="https://unpkg.com/rune-grab/dist/rune-grab.iife.global.js"
                strategy="afterInteractive"
                onLoad={() => {
                    const open = () => {
                        const menu = document.getElementById("__rune-grab-menu__");
                        if (!menu) { setTimeout(open, 50); return; }
                        // click the collapsed tab to expand
                        const btn = menu.querySelector("button");
                        if (btn) btn.click();
                        // wait for re-render, then center at bottom with gap
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                const rect = menu.getBoundingClientRect();
                                menu.style.bottom = "auto";
                                menu.style.right = "auto";
                                menu.style.left = `${(window.innerWidth - rect.width) / 2}px`;
                                menu.style.top = `${window.innerHeight - rect.height - 24}px`;
                            });
                        });
                    };
                    open();
                }}
            />

            <Box
                maxW="1200px"
                mx="auto"
                position="relative"
                borderLeft="1px dashed"
                borderRight="1px dashed"
                borderColor="rgba(255,255,255,0.08)"
                display="flex"
                flexDirection="column"
                minH="100vh"
            >
                <Navbar />
                <Box
                    position="relative"
                    overflow="hidden"
                    pt={{ base: "120px", md: "140px" }}
                    pb={{ base: 10, md: 16 }}
                >
                    <Box position="absolute" inset={0} overflow="hidden" opacity={0.5}>
                        <DarkVeil
                            hueShift={25}
                            noiseIntensity={0.03}
                            scanlineIntensity={0}
                            speed={0.15}
                            scanlineFrequency={0}
                            warpAmount={0.2}
                            resolutionScale={1}
                        />
                    </Box>

                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        h="200px"
                        bg="linear-gradient(to bottom, transparent, #171717)"
                        zIndex={1}
                        pointerEvents="none"
                    />

                    <VStack
                        position="relative"
                        zIndex={2}
                        spacing={5}
                        maxW="700px"
                        mx="auto"
                        px={{ base: 5, md: 8 }}
                        textAlign="center"
                    >
                        <Link href="/">
                            <HStack
                                spacing={2}
                                color="gray.500"
                                cursor="pointer"
                                transition="all 0.2s"
                                _hover={{ color: "gray.300" }}
                                mb={4}
                                justify="center"
                            >
                                <Icon as={FiArrowLeft} boxSize={3.5} />
                                <Text fontSize="sm" fontWeight={500}>Back to home</Text>
                            </HStack>
                        </Link>

                        <HStack spacing={{ base: 3, md: 1 }} align="center">
                            <Image
                                src="/rune-grab.png"
                                alt="rune-grab logo"
                                h={{ base: "56px", md: "80px" }}
                                w="auto"
                                filter="invert(1)"
                                opacity={1}
                            />
                            <Heading
                                as="h1"
                                fontSize={{ base: "5xl", lg: "7xl" }}
                                fontWeight={700}
                                lineHeight={1.1}
                                letterSpacing="-0.03em"
                                sx={{
                                    background: "#e6e6e6",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Grab
                            </Heading>
                        </HStack>

                        <Text
                            fontSize={{ base: "md", md: "xl" }}
                            color="gray.400"
                            lineHeight={1.5}
                            maxW="520px"
                            mx="auto"
                        >
                            Point at any UI element, grab its context, and send it
                            to Claude, Cursor, Codex, or Claude Code.
                        </Text>

                        <HStack spacing={3} mt={2}>
                            <Badge
                                bg="whiteAlpha.100"
                                color="gray.300"
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="xs"
                                fontWeight={500}
                                textTransform="none"
                            >
                                MIT Licensed
                            </Badge>
                            <Badge
                                bg="whiteAlpha.100"
                                color="gray.300"
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="xs"
                                fontWeight={500}
                                textTransform="none"
                            >
                                Works with most frameworks
                            </Badge>
                        </HStack>
                    </VStack>
                </Box>

                {/* Install section */}
                <Box px={{ base: 5, md: 8 }} pb={{ base: 10, md: 16 }}>
                    <VStack spacing={10} maxW="700px" mx="auto">

                        {/* Install command */}
                        <VStack spacing={4} w="full">
                            <Text
                                fontSize="sm"
                                fontWeight={600}
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="0.08em"
                            >
                                Install
                            </Text>
                            <Box
                                w="full"
                                bg="rgba(255,255,255,0.04)"
                                border="1px dashed"
                                borderColor="rgba(255,255,255,0.1)"
                                borderRadius="lg"
                                px={5}
                                py={4}
                            >
                                <Flex align="center" justify="space-between">
                                    <HStack spacing={3}>
                                        <Icon as={FiTerminal} color="gray.500" boxSize={4} />
                                        <Code
                                            bg="transparent"
                                            color="gray.300"
                                            fontSize="md"
                                            fontFamily="mono"
                                        >
                                            npx rune-grab init
                                        </Code>
                                    </HStack>
                                    <Icon
                                        as={FiCopy}
                                        color="gray.600"
                                        boxSize={4}
                                        cursor="pointer"
                                        transition="all 0.2s"
                                        _hover={{ color: "gray.300" }}
                                        onClick={() => navigator.clipboard.writeText("npx rune-grab init")}
                                    />
                                </Flex>
                            </Box>
                        </VStack>

                        {/* How it works */}
                        <VStack spacing={4} w="full" textAlign="left">
                            <Text
                                fontSize="sm"
                                fontWeight={600}
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="0.08em"
                                w="full"
                                textAlign="center"
                            >
                                How it works
                            </Text>
                            <VStack spacing={3} w="full">
                                {[
                                    {
                                        step: "01",
                                        title: "Inspect mode",
                                        desc: "Hover over any element to see its component name, file path, and line number.",
                                    },
                                    {
                                        step: "02",
                                        title: "Screenshot mode",
                                        desc: "Drag a rectangle to capture a region as a screenshot with full context.",
                                    },
                                    {
                                        step: "03",
                                        title: "Send anywhere",
                                        desc: "Grabs go to your clipboard — or auto-paste into Claude, Cursor, Codex, or Claude Code.",
                                    },
                                ].map((item) => (
                                    <Box
                                        key={item.step}
                                        w="full"
                                        bg="rgba(255,255,255,0.03)"
                                        border="1px solid"
                                        borderColor="rgba(255,255,255,0.06)"
                                        borderRadius="lg"
                                        px={5}
                                        py={4}
                                    >
                                        <HStack spacing={4} align="start">
                                            <Text
                                                fontSize="xs"
                                                fontWeight={600}
                                                color="gray.600"
                                                fontFamily="mono"
                                                mt={0.5}
                                            >
                                                {item.step}
                                            </Text>
                                            <Box>
                                                <Text fontSize="md" fontWeight={600} color="gray.200">
                                                    {item.title}
                                                </Text>
                                                <Text fontSize="sm" color="gray.500" mt={1} lineHeight={1.5}>
                                                    {item.desc}
                                                </Text>
                                            </Box>
                                        </HStack>
                                    </Box>
                                ))}
                            </VStack>
                        </VStack>

                        {/* Try it now section */}
                        <VStack spacing={4} w="full">
                            <Text
                                fontSize="sm"
                                fontWeight={600}
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="0.08em"
                            >
                                Try it now
                            </Text>
                            <Text
                                fontSize="sm"
                                color="gray.500"
                                textAlign="center"
                                maxW="440px"
                            >
                                rune-grab is active on this page. Press{" "}
                                <Code
                                    bg="whiteAlpha.100"
                                    color="gray.300"
                                    fontSize="xs"
                                    px={1.5}
                                    py={0.5}
                                    borderRadius="md"
                                >
                                    Cmd+Shift+G
                                </Code>{" "}
                                or use the floating menu at the bottom to start grabbing elements.
                            </Text>

                            {/* Demo elements — wrapped in named components for fiber patching */}
                            <Box
                                w="full"
                                bg="rgba(255,255,255,0.02)"
                                border="1px dashed"
                                borderColor="rgba(255,255,255,0.08)"
                                borderRadius="xl"
                                p={{ base: 5, md: 8 }}
                                mt={2}
                            >
                                <Flex
                                    align="center"
                                    justify="center"
                                    minH="120px"
                                >
                                    <Button
                                        size="lg"
                                        bg="#e6e6e6"
                                        color="#171717"
                                        fontWeight={600}
                                        fontSize="md"
                                        borderRadius="full"
                                        px={8}
                                        _hover={{ bg: "#d4d4d4" }}
                                        _active={{ bg: "#c2c2c2" }}
                                        transition="all 0.2s"
                                        onClick={() => {
                                            const menu = document.getElementById("__rune-grab-menu__");
                                            if (!menu) return;
                                            const buttons = menu.querySelectorAll("button");
                                            // 2nd button in the expanded menu is the inspect/reference mode toggle
                                            if (buttons.length >= 2) buttons[1].click();
                                        }}
                                    >
                                        Grab me
                                    </Button>
                                </Flex>
                            </Box>

                            <Text
                                fontSize="xs"
                                color="gray.600"
                                mt={1}
                            >
                                File paths and component names resolve fully when running locally.
                            </Text>
                        </VStack>

                        {/* npm link */}
                        <HStack spacing={4} pt={4}>
                            <Button
                                as="a"
                                href="https://www.npmjs.com/package/rune-grab"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                bg="#e6e6e6"
                                color="#171717"
                                fontWeight={500}
                                fontSize="sm"
                                borderRadius="full"
                                px={5}
                                _hover={{ bg: "#d4d4d4" }}
                                _active={{ bg: "#c2c2c2" }}
                                transition="all 0.2s"
                            >
                                View on npm
                            </Button>
                            <Button
                                as="a"
                                href="https://github.com/RuneLtd/rune-grab"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                bg="transparent"
                                color="gray.400"
                                fontWeight={500}
                                fontSize="sm"
                                border="1px solid"
                                borderColor="rgba(255,255,255,0.1)"
                                borderRadius="full"
                                px={5}
                                _hover={{ borderColor: "rgba(255,255,255,0.2)", color: "gray.200" }}
                                transition="all 0.2s"
                            >
                                GitHub
                            </Button>
                        </HStack>
                    </VStack>
                </Box>

                <Box pb={{ base: 16, md: 28 }} />

                <Box mt="auto">
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}
