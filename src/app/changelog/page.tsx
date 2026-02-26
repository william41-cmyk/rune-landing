
"use client";

import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
} from "@chakra-ui/react";
import {
    FiArrowLeft,
} from "react-icons/fi";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkVeil from "@/components/DarkVeil";

const releases = [
    {
        version: "v0.1.1",
        date: "26 February 2026",
        latest: true,
        sections: [
            {
                title: "Improved",
                items: [
                    "Architect agent — clarifying questions now focus on feature behavior, UX decisions, and scope rather than technology stack or implementation details",
                    "Raven agent — iteration prompts are now comprehensive, capturing all meaningful improvements instead of artificially limiting the number of suggestions",
                    "Skills bridge — skill loading is now async with fallback to the project's skills/ directory, enabling externally defined skills",
                    "Skill files are automatically cleared before update restarts to ensure fresh content ships with each version",
                    "Clarification UI — revamped ClarificationCard and ClarificationPanel with improved layout and interaction patterns",
                    "Recovery state handling — defensive cleanup of stale pending sessions to prevent the recovery UI from flashing after a session completes",
                ],
            },
            {
                title: "Added",
                items: [
                    "Rune styling skill",
                    "ChatTextBlock component for richer in-chat content rendering",
                    "New core constants for improved configuration consistency",
                ],
            },
            {
                title: "Fixed",
                items: [
                    "Stale recovery UI flash that appeared briefly after a session completed",
                ],
            },
            {
                title: "Removed",
                items: [
                    "Architect quick/thorough mode distinction — the agent now adapts naturally to task complexity",
                ],
            },
        ],
    },
    {
        version: "v0.1.0",
        date: "24 February 2026",
        latest: false,
        sections: [
            {
                title: "Added",
                items: [
                    "Multi-agent orchestration — Architect, Coder, Raven, Sentinel, and Reviewer agents working through configurable pipelines",
                    "Built-in presets — Fast, Balanced configurations for different workflows",
                    "Session persistence — pause, resume, and automatic crash recovery via append-only joblog",
                    "Integrated IDE — embedded VS Code editor, terminal with PTY isolation, file browser, and SQLite database explorer",
                    "Git worktree isolation — each session runs in its own worktree to protect your working branch",
                    "Architect clarifications — the Architect agent asks questions before implementation begins",
                    "Real-time activity streaming — live display of agent thinking, actions, and results with collapsible reasoning",
                    "Code diff viewer — visual diff panel for reviewing agent-generated changes",
                    "Skills system — markdown-based skill definitions that teach agents domain knowledge",
                    "Project auto-detection — automatically identifies languages, frameworks, and databases in your project",
                    "Rate limit handling — automatic detection and scheduled auto-resume when hitting API limits",
                    "Autonomy modes — supervised or fully automatic agent execution",
                    "Multi-pane editor layouts — drag-and-drop layout customization with popout windows",
                    "Image attachments — attach images to task prompts for visual context",
                    "Embedded web browser — built-in browser panel with tabs, navigation, history, and bookmarks",
                    "Session interrupts — stop, redirect, or modify a running session mid-task",
                    "Branch management — switch between worktree branches, merge completed work, and delete old versions",
                    "Auto-updates — background update downloads with one-click restart",
                ],
            },
        ],
    },
];

export default function ChangelogPage() {
    return (
        <Box minH="100vh" bg="#171717" overflowX="hidden">
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
                            Changelog
                        </Heading>

                        <Text
                            fontSize={{ base: "md", md: "xl" }}
                            color="gray.400"
                            lineHeight={1.5}
                            maxW="500px"
                            mx="auto"
                        >
                            All the latest updates and improvements to Rune.
                        </Text>
                    </VStack>
                </Box>
                <VStack
                    spacing={0}
                    w="full"
                    px={{ base: 5, md: 8 }}
                    pb={{ base: 16, md: 28 }}
                    maxW="700px"
                    mx="auto"
                >
                    {releases.map((release) => (
                        <Box
                            key={release.version}
                            w="full"
                            py={10}
                            borderTop="1px dashed"
                            borderColor="rgba(255,255,255,0.08)"
                        >
                            <HStack spacing={3} mb={2} align="center">
                                <Text
                                    fontSize="2xl"
                                    fontWeight={700}
                                    fontFamily="var(--font-geist-mono)"
                                    sx={{
                                        background: "#e6e6e6",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {release.version}
                                </Text>
                                {release.latest && (
                                    <Text
                                        fontSize="xs"
                                        fontWeight={600}
                                        color="gray.500"
                                    >
                                        latest
                                    </Text>
                                )}
                            </HStack>

                            <Text
                                fontSize="sm"
                                color="gray.600"
                                fontWeight={500}
                                mb={8}
                            >
                                {release.date}
                            </Text>
                            <VStack spacing={6} align="stretch">
                                {release.sections.map((section) => (
                                    <Box key={section.title}>
                                        <Text
                                            fontSize="sm"
                                            fontWeight={700}
                                            color="gray.300"
                                            mb={3}
                                        >
                                            {section.title}
                                        </Text>
                                        <VStack spacing={1.5} align="stretch" pl={2}>
                                            {section.items.map((item, i) => (
                                                <HStack key={i} spacing={2} align="start">
                                                    <Text
                                                        fontSize="sm"
                                                        color="gray.600"
                                                        userSelect="none"
                                                        lineHeight={1.7}
                                                    >
                                                        -
                                                    </Text>
                                                    <Text
                                                        fontSize="sm"
                                                        color="gray.500"
                                                        lineHeight={1.7}
                                                    >
                                                        {item}
                                                    </Text>
                                                </HStack>
                                            ))}
                                        </VStack>
                                    </Box>
                                ))}
                            </VStack>
                        </Box>
                    ))}
                </VStack>

                <Box mt="auto">
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}