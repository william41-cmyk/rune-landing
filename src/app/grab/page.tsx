"use client";

import { useEffect } from "react";
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
    useColorMode,
} from "@chakra-ui/react";
import {
    FiCopy,
    FiTerminal,
} from "react-icons/fi";
import Script from "next/script";
import { colors } from "@/theme/colors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelBlast from "@/components/PixelBlast";

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
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";
    const c = colors(isDark);

    const openMenu = () => {
        const menu = document.getElementById("__rune-grab-menu__");
        if (!menu) { setTimeout(openMenu, 50); return; }
        const btn = menu.querySelector("button");
        if (btn) btn.click();
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const rect = menu.getBoundingClientRect();
                // Position centered horizontally, just below the hero badges
                const anchor = document.getElementById("grab-menu-anchor");
                const anchorY = anchor
                    ? anchor.getBoundingClientRect().bottom + window.scrollY + 20
                    : window.innerHeight * 0.48;
                menu.style.bottom = "auto";
                menu.style.right = "auto";
                menu.style.left = `${(window.innerWidth - rect.width) / 2}px`;
                menu.style.top = `${anchorY - window.scrollY}px`;
                menu.style.position = "fixed";
            });
        });
    };

    useEffect(() => {
        // If the script already loaded on a previous visit but the menu was cleaned up,
        // re-inject a fresh script tag so rune-grab re-initialises.
        const menu = document.getElementById("__rune-grab-menu__");
        if (!menu && (window as any).__RUNE_GRAB_LOADED__) {
            const s = document.createElement("script");
            s.src = "https://unpkg.com/rune-grab/dist/rune-grab.iife.global.js";
            s.onload = () => openMenu();
            document.body.appendChild(s);
        }

        return () => {
            const menu = document.getElementById("__rune-grab-menu__");
            if (menu) menu.remove();
            document.querySelectorAll('script[src*="rune-grab"]').forEach((s) => s.remove());
        };
    }, []);

    return (
        <Box minH="100vh" bg={c.bg} overflowX="hidden">
            <Script
                src="https://unpkg.com/rune-grab/dist/rune-grab.iife.global.js"
                strategy="afterInteractive"
                onLoad={() => {
                    (window as any).__RUNE_GRAB_LOADED__ = true;
                    openMenu();
                }}
            />

            {/* Override rune-grab overlay dashed border for light mode */}
            <style>{`
                [id*="__rune-grab"] [style*="dashed"],
                [id*="__rune-grab"][style*="dashed"] {
                    border-color: ${isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)"} !important;
                }
            `}</style>

            <Box
                maxW="1200px"
                mx="auto"
                position="relative"
                borderLeft="1px dashed"
                borderRight="1px dashed"
                borderColor={c.border.subtle}
                display="flex"
                flexDirection="column"
                minH="100vh"
            >
                <Navbar />
                <Box
                    position="relative"
                    overflow="hidden"
                    pt={{ base: "120px", md: "180px" }}
                    pb={{ base: 28, md: 40 }}
                >
                    <Box position="absolute" inset={0} overflow="hidden" opacity={0.5}>
                        <PixelBlast
                            pixelSize={4}
                            color={c.pixelBlast}
                            enableRipples={false}
                            speed={0}
                            edgeFade={0.5}
                            transparent={true}
                            timeOffset={449}
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
                        w="90px"
                        h="25px"
                        borderRadius="20px"
                        bg={c.bg}
                        boxShadow={`0 0 60px 60px ${c.bg}`}
                        pointerEvents="none"
                        zIndex={1}
                    />
                    {/* Mask for subtitle */}
                    <Box
                        position="absolute"
                        top="58%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="400px"
                        h="50px"
                        borderRadius="16px"
                        bg={c.bg}
                        boxShadow={`0 0 50px 50px ${c.bg}`}
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
                letterSpacing="-0.03em"
                            as="h2"
                            fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
                            fontWeight={500}
                            lineHeight={1.2}
                            maxW="700px"
                            sx={{
                                background: c.text.primary,
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Grab
                        </Heading>

                        <Text
                letterSpacing="-0.03em"
                            fontSize={{ base: "lg", md: "1xl", lg: "3xl" }}
                            color={c.text.secondary}
                            fontWeight={500}
                            lineHeight={1.5}
                            maxW="550px"
                        >
                            Point at any UI element, grab its context, and send it
                            to Claude, Cursor, Codex, or Claude Code.
                        </Text>

                        <HStack spacing={3} mt={2}>
                            <Badge
                                bg={c.overlay.medium}
                                color={c.text.secondary}
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
                                bg={c.overlay.medium}
                                color={c.text.secondary}
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

                        {/* Anchor point for rune-grab menu positioning */}
                        <Box id="grab-menu-anchor" />
                    </VStack>
                </Box>

                {/* Install section */}
                <Box px={{ base: 5, md: 8 }} pb={{ base: 10, md: 16 }} position="relative" zIndex={2}>
                    <VStack spacing={10} maxW="700px" mx="auto">

                        {/* Install command */}
                        <VStack spacing={4} w="full">
                            <Text
                                fontSize="sm"
                                fontWeight={600}
                                color={c.text.subtle}
                                textTransform="uppercase"
                                letterSpacing="0.08em"
                            >
                                Install
                            </Text>
                            <Box
                                w="full"
                                bg={c.overlay.soft}
                                border="1px dashed"
                                borderColor={c.border.subtle}
                                borderRadius="lg"
                                px={5}
                                py={4}
                            >
                                <Flex align="center" justify="space-between">
                                    <HStack spacing={3}>
                                        <Icon as={FiTerminal} color={c.text.subtle} boxSize={4} />
                                        <Code
                                            bg="transparent"
                                            color={c.text.secondary}
                                            fontSize="md"
                                            fontFamily="mono"
                                        >
                                            npx rune-grab init
                                        </Code>
                                    </HStack>
                                    <Icon
                                        as={FiCopy}
                                        color={c.text.placeholder}
                                        boxSize={4}
                                        cursor="pointer"
                                        transition="all 0.2s"
                                        _hover={{ color: c.text.primary }}
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
                                color={c.text.subtle}
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
                                        bg={c.overlay.subtle}
                                        border="1px solid"
                                        borderColor={c.border.faint}
                                        borderRadius="lg"
                                        px={5}
                                        py={4}
                                    >
                                        <HStack spacing={4} align="start">
                                            <Text
                letterSpacing="-0.03em"
                                                fontSize="xs"
                                                fontWeight={600}
                                                color={c.text.placeholder}
                                                fontFamily="mono"
                                                mt={0.5}
                                            >
                                                {item.step}
                                            </Text>
                                            <Box>
                                                <Text fontSize="md" fontWeight={600} color={c.btn.hover} letterSpacing="-0.03em">
                                                    {item.title}
                                                </Text>
                                                <Text fontSize="sm" color={c.text.muted} mt={1} lineHeight={1.5} letterSpacing="-0.03em">
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
                                color={c.text.subtle}
                                textTransform="uppercase"
                                letterSpacing="0.08em"
                            >
                                Try it now
                            </Text>
                            <Text
                letterSpacing="-0.03em"
                                fontSize="sm"
                                color={c.text.muted}
                                textAlign="center"
                                maxW="440px"
                            >
                                rune-grab is active on this page. Press{" "}
                                <Code
                                    bg={c.overlay.medium}
                                    color={c.text.secondary}
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
                                bg={c.overlay.subtle}
                                border="1px dashed"
                                borderColor={c.border.subtle}
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
                                        bg={c.btn.bg}
                                        color={c.btn.text}
                                        fontWeight={600}
                                        fontSize="md"
                                        borderRadius="full"
                                        px={8}
                                        _hover={{ bg: c.btn.hover }}
                                        _active={{ bg: c.btn.active }}
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
                letterSpacing="-0.03em"
                                fontSize="xs"
                                color={c.text.placeholder}
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
                                bg={c.btn.bg}
                                color={c.btn.text}
                                fontWeight={500}
                                fontSize="sm"
                                borderRadius="full"
                                px={5}
                                _hover={{ bg: c.btn.hover }}
                                _active={{ bg: c.btn.active }}
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
                                color={c.text.subtle}
                                fontWeight={500}
                                fontSize="sm"
                                border="1px solid"
                                borderColor={c.border.subtle}
                                borderRadius="full"
                                px={5}
                                _hover={{
                                    borderColor: c.border.default,
                                    color: c.text.primary,
                                }}
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
