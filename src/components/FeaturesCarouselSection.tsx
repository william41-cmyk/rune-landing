"use client";

import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import {
    FiChevronLeft,
    FiChevronRight,
    FiClock,
    FiGitBranch,
    FiBookOpen,
    FiGitMerge,
    FiPlay,
    FiCpu,
    FiLayers,
    FiRefreshCw,
    FiFileText,
    FiTerminal,
    FiSettings,
    FiCode,
    FiDatabase,
} from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/* ------------------------------------------------------------------ */
/*  GlassIcon                                                          */
/* ------------------------------------------------------------------ */

interface GlassIconProps {
    icon: any;
    color: string;
}

function GlassIcon({ icon: IconComponent }: GlassIconProps) {
    return (
        <Box
            as="span"
            display="inline-flex"
            position="relative"
            w="40px"
            h="40px"
            flexShrink={0}
            borderRadius="12px"
            alignItems="center"
            justifyContent="center"
            sx={{
                background: "hsla(0, 0%, 100%, 0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 0 0 1px hsla(0, 0%, 100%, 0.2) inset",
            }}
        >
            <Icon
                as={IconComponent}
                boxSize="18px"
                color="white"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
            />
        </Box>
    );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface CardData {
    name: string;
    icon: any;
    iconColor: string;
    description: string;
    tint: string;
    visual: string;
}

const tabData: Record<string, CardData[]> = {
    Sessions: [
        {
            name: "Session Manager",
            icon: FiClock,
            iconColor: "purple",
            description: "Every session is persisted, searchable, and recoverable at any time.",
            tint: "270, 60%",
            visual: "sessions",
        },
        {
            name: "Session History",
            icon: FiRefreshCw,
            iconColor: "blue",
            description: "Browse, resume, and fork any previous coding session instantly.",
            tint: "210, 60%",
            visual: "sessions-history",
        },
        {
            name: "Git Worktrees",
            icon: FiGitBranch,
            iconColor: "green",
            description: "Each session runs in its own isolated git worktree branch.",
            tint: "150, 50%",
            visual: "sessions-branch",
        },
        {
            name: "Terminal Sessions",
            icon: FiTerminal,
            iconColor: "amber",
            description: "Persistent terminal instances that survive across restarts and reconnects.",
            tint: "35, 65%",
            visual: "sessions-terminal",
        },
    ],
    Pipelines: [
        {
            name: "Visual Editor",
            icon: FiGitMerge,
            iconColor: "purple",
            description: "Design multi-agent pipelines with a drag-and-drop node editor.",
            tint: "270, 60%",
            visual: "pipelines-editor",
        },
        {
            name: "Agent Nodes",
            icon: FiCpu,
            iconColor: "blue",
            description: "Connect Architect, Coder, and Raven nodes in any configuration.",
            tint: "210, 65%",
            visual: "pipelines-nodes",
        },
        {
            name: "Run Pipeline",
            icon: FiPlay,
            iconColor: "green",
            description: "Execute custom pipelines with real-time progress and iteration loops.",
            tint: "150, 50%",
            visual: "pipelines-loop",
        },
        {
            name: "Pipeline Config",
            icon: FiSettings,
            iconColor: "amber",
            description: "Fine-tune model parameters, token limits, and retry strategies per node.",
            tint: "35, 65%",
            visual: "pipelines-config",
        },
    ],
    Skills: [
        {
            name: "Built-in Skills",
            icon: FiLayers,
            iconColor: "amber",
            description: "Pre-loaded capabilities for common frameworks and languages.",
            tint: "35, 70%",
            visual: "skills-builtin",
        },
        {
            name: "Custom Skills",
            icon: FiFileText,
            iconColor: "purple",
            description: "Write markdown skills to teach agents your codebase conventions.",
            tint: "270, 55%",
            visual: "skills-markdown",
        },
        {
            name: "Extend Agents",
            icon: FiBookOpen,
            iconColor: "blue",
            description: "Inject domain knowledge so agents understand your architecture.",
            tint: "210, 60%",
            visual: "skills-extend",
        },
        {
            name: "Schema Aware",
            icon: FiDatabase,
            iconColor: "green",
            description: "Agents learn your database schema and generate type-safe queries.",
            tint: "150, 50%",
            visual: "skills-schema",
        },
    ],
};

const tabs = Object.keys(tabData);

/* ------------------------------------------------------------------ */
/*  Card visuals                                                       */
/* ------------------------------------------------------------------ */

function CardVisual({ type }: { type: string }) {
    if (type === "sessions") {
        return (
            <VStack spacing={2.5} align="stretch" w="100%">
                {[
                    { name: "feat/auth-flow", time: "2m ago", dot: "#22c55e" },
                    { name: "fix/api-routes", time: "1h ago", dot: "#3b82f6" },
                    { name: "refactor/db-layer", time: "3h ago", dot: "#525252" },
                ].map((s, i) => (
                    <Flex
                        key={i}
                        bg={i === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}
                        borderRadius="10px"
                        px={4}
                        py={3}
                        align="center"
                        justify="space-between"
                        border="1px solid"
                        borderColor={i === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}
                    >
                        <HStack spacing={2.5}>
                            <Box w="8px" h="8px" borderRadius="full" bg={s.dot} boxShadow={`0 0 6px ${s.dot}`} />
                            <Text fontSize="xs" fontFamily="mono" color="gray.200" fontWeight={500}>{s.name}</Text>
                        </HStack>
                        <Text fontSize="2xs" color="gray.500">{s.time}</Text>
                    </Flex>
                ))}
            </VStack>
        );
    }

    if (type === "sessions-history") {
        return (
            <VStack spacing={2} align="stretch" w="100%">
                {[
                    { msg: "Add user authentication", tokens: "12.4k" },
                    { msg: "Fix CORS middleware", tokens: "3.2k" },
                    { msg: "Refactor database schema", tokens: "8.7k" },
                    { msg: "Add rate limiting", tokens: "5.1k" },
                ].map((s, i) => (
                    <Flex
                        key={i}
                        bg="rgba(255,255,255,0.04)"
                        border="1px solid"
                        borderColor="rgba(255,255,255,0.04)"
                        borderRadius="8px"
                        px={4}
                        py={2.5}
                        align="center"
                        justify="space-between"
                    >
                        <Text fontSize="xs" color="gray.300" noOfLines={1} flex={1}>{s.msg}</Text>
                        <Text fontSize="xs" fontFamily="mono" color="gray.500" ml={3}>{s.tokens}</Text>
                    </Flex>
                ))}
            </VStack>
        );
    }

    if (type === "sessions-branch") {
        return (
            <Flex w="100%" justify="center" align="center" flex={1}>
                <svg width="200" height="150" viewBox="0 0 220 160">
                    <line x1="50" y1="20" x2="50" y2="150" stroke="rgba(34,197,94,0.5)" strokeWidth="2.5" />
                    <line x1="50" y1="55" x2="130" y2="55" stroke="rgba(168,85,247,0.5)" strokeWidth="2.5" />
                    <line x1="130" y1="55" x2="130" y2="120" stroke="rgba(168,85,247,0.5)" strokeWidth="2.5" />
                    <line x1="50" y1="95" x2="180" y2="95" stroke="rgba(59,130,246,0.5)" strokeWidth="2.5" />
                    <circle cx="50" cy="20" r="6" fill="#22c55e" />
                    <circle cx="50" cy="55" r="6" fill="#22c55e" />
                    <circle cx="50" cy="95" r="6" fill="#22c55e" />
                    <circle cx="50" cy="130" r="5" fill="#22c55e" opacity="0.4" />
                    <circle cx="130" cy="55" r="6" fill="#a855f7" />
                    <circle cx="130" cy="120" r="6" fill="#a855f7" />
                    <circle cx="180" cy="95" r="6" fill="#3b82f6" />
                    <text x="64" y="24" fill="#a3a3a3" fontSize="11" fontFamily="monospace">main</text>
                    <text x="144" y="59" fill="#c084fc" fontSize="11" fontFamily="monospace">session/auth</text>
                    <text x="194" y="99" fill="#60a5fa" fontSize="11" fontFamily="monospace">session/api</text>
                </svg>
            </Flex>
        );
    }

    if (type === "sessions-terminal") {
        return (
            <Box
                w="100%"
                bg="rgba(0,0,0,0.3)"
                borderRadius="10px"
                p={3}
                fontFamily="mono"
                fontSize="2xs"
                border="1px solid rgba(255,255,255,0.04)"
            >
                <Text color="gray.500" mb={1}>~/project $</Text>
                <Text color="#4ade80" mb={0.5}>npm run dev</Text>
                <Text color="gray.500" mb={0.5}>ready - started on port 3000</Text>
                <Text color="gray.500" mb={0.5}>compiled successfully in 1.2s</Text>
                <Text color="#fbbf24" mb={0.5}>warn - ESLint: 2 warnings</Text>
                <Text color="gray.600" mt={2}>~/project $<Box as="span" display="inline-block" w="6px" h="12px" bg="gray.400" ml={1} animation="blink 1s step-end infinite" /></Text>
            </Box>
        );
    }

    if (type === "pipelines-editor") {
        return (
            <Flex w="100%" justify="center" align="center" flex={1}>
                <Box
                    w="100%"
                    p={3}
                    position="relative"
                    sx={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                    }}
                >
                    <svg width="100%" height="90" viewBox="0 0 240 90">
                        <defs>
                            <linearGradient id="fce1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                            </linearGradient>
                            <linearGradient id="fce2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>
                        <path d="M 60 28 C 95 28 100 58 135 58" fill="none" stroke="url(#fce1)" strokeWidth="2" />
                        <path d="M 175 58 C 200 58 205 28 230 28" fill="none" stroke="url(#fce2)" strokeWidth="2" />
                        <rect x="8" y="16" width="52" height="24" rx="7" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.35)" strokeWidth="1" />
                        <text x="18" y="33" fill="#c084fc" fontSize="10" fontFamily="monospace">Arch</text>
                        <rect x="118" y="46" width="52" height="24" rx="7" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.35)" strokeWidth="1" />
                        <text x="127" y="63" fill="#60a5fa" fontSize="10" fontFamily="monospace">Code</text>
                        <rect x="205" y="16" width="36" height="24" rx="7" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.35)" strokeWidth="1" />
                        <text x="211" y="33" fill="#4ade80" fontSize="10" fontFamily="monospace">Rev</text>
                    </svg>
                </Box>
            </Flex>
        );
    }

    if (type === "pipelines-nodes") {
        return (
            <VStack spacing={2.5} align="stretch" w="100%">
                {[
                    { name: "Architect", color: "#c084fc", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.25)" },
                    { name: "Coder", color: "#60a5fa", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" },
                    { name: "Raven", color: "#4ade80", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)" },
                ].map((n, i) => (
                    <Flex key={i} bg={n.bg} border="1px solid" borderColor={n.border} borderRadius="10px" px={4} py={3} align="center" gap={2.5}>
                        <Box w="8px" h="8px" borderRadius="full" bg={n.color} boxShadow={`0 0 10px ${n.color}`} />
                        <Text fontSize="xs" fontFamily="mono" fontWeight={600} color={n.color}>{n.name}</Text>
                        <Box flex={1} />
                        <HStack spacing={1.5}>
                            <Box w="4px" h="4px" borderRadius="full" bg="rgba(255,255,255,0.15)" />
                            <Box w="4px" h="4px" borderRadius="full" bg="rgba(255,255,255,0.15)" />
                        </HStack>
                    </Flex>
                ))}
            </VStack>
        );
    }

    if (type === "pipelines-loop") {
        return (
            <VStack spacing={4} w="100%" align="center">
                <Flex bg="rgba(34,197,94,0.1)" border="1px solid rgba(34,197,94,0.25)" borderRadius="full" px={4} py={1.5} align="center" gap={2}>
                    <Box w="7px" h="7px" borderRadius="full" bg="#22c55e" />
                    <Text fontSize="xs" fontFamily="mono" color="#4ade80" fontWeight={600}>Running</Text>
                </Flex>
                <VStack w="100%" spacing={3}>
                    {[
                        { label: "Architect", pct: "100%", color: "#a855f7" },
                        { label: "Coder", pct: "72%", color: "#3b82f6" },
                        { label: "Raven", pct: "0%", color: "#22c55e" },
                    ].map((p, i) => (
                        <Box key={i} w="100%">
                            <Flex justify="space-between" mb={1.5}>
                                <Text fontSize="xs" color="gray.400">{p.label}</Text>
                                <Text fontSize="xs" fontFamily="mono" color="gray.500">{p.pct}</Text>
                            </Flex>
                            <Box w="100%" h="5px" bg="rgba(255,255,255,0.05)" borderRadius="full">
                                <Box w={p.pct} h="100%" bg={p.color} borderRadius="full" opacity={0.75} boxShadow={`0 0 10px ${p.color}30`} />
                            </Box>
                        </Box>
                    ))}
                </VStack>
            </VStack>
        );
    }

    if (type === "pipelines-config") {
        return (
            <VStack spacing={3} align="stretch" w="100%">
                {[
                    { label: "Model", value: "Claude 4 Opus", color: "#c084fc" },
                    { label: "Max Tokens", value: "128,000", color: "#60a5fa" },
                    { label: "Temperature", value: "0.3", color: "#4ade80" },
                    { label: "Retry Limit", value: "3", color: "#fbbf24" },
                ].map((c, i) => (
                    <Flex key={i} justify="space-between" align="center">
                        <Text fontSize="xs" color="gray.500">{c.label}</Text>
                        <Text fontSize="xs" fontFamily="mono" color={c.color} fontWeight={500}>{c.value}</Text>
                    </Flex>
                ))}
                <Box w="100%" h="1px" bg="rgba(255,255,255,0.04)" my={1} />
                <Flex bg="rgba(255,255,255,0.04)" borderRadius="8px" px={3} py={2} align="center" gap={2}>
                    <Icon as={FiCode} boxSize={3} color="gray.500" />
                    <Text fontSize="2xs" fontFamily="mono" color="gray.400">pipeline.config.json</Text>
                </Flex>
            </VStack>
        );
    }

    if (type === "skills-builtin") {
        return (
            <Flex flexWrap="wrap" gap={2.5} w="100%" alignContent="start">
                {["React", "Next.js", "Python", "Rust", "Go", "TypeScript", "Docker", "SQL", "Node.js", "Swift"].map((s) => (
                    <Flex key={s} bg="rgba(245,158,11,0.08)" border="1px solid rgba(245,158,11,0.2)" borderRadius="8px" px={3} py={1.5}>
                        <Text fontSize="xs" fontFamily="mono" color="#fbbf24" fontWeight={500}>{s}</Text>
                    </Flex>
                ))}
            </Flex>
        );
    }

    if (type === "skills-markdown") {
        return (
            <Box w="100%" bg="rgba(255,255,255,0.03)" borderRadius="10px" p={4} fontFamily="mono" fontSize="xs" color="gray.500" lineHeight={2.2} border="1px solid rgba(255,255,255,0.04)">
                <Text color="#c084fc" fontWeight={600}># API Conventions</Text>
                <Text color="gray.600" my={0.5}>---</Text>
                <Text>Always use <Text as="span" color="gray.300">zod</Text> for validation</Text>
                <Text>Return <Text as="span" color="gray.300">{"{ data, error }"}</Text> format</Text>
                <Text>Use <Text as="span" color="gray.300">camelCase</Text> for endpoints</Text>
                <Text>Prefer <Text as="span" color="gray.300">async/await</Text> over callbacks</Text>
            </Box>
        );
    }

    if (type === "skills-extend") {
        return (
            <VStack spacing={2.5} align="stretch" w="100%">
                {[
                    { label: "auth-patterns.md", color: "#60a5fa" },
                    { label: "db-conventions.md", color: "#c084fc" },
                    { label: "api-standards.md", color: "#4ade80" },
                    { label: "testing-guide.md", color: "#fbbf24" },
                ].map((f, i) => (
                    <Flex key={i} bg="rgba(255,255,255,0.04)" border="1px solid rgba(255,255,255,0.04)" borderRadius="8px" px={4} py={3} align="center" gap={2.5}>
                        <Icon as={FiFileText} boxSize={3.5} color={f.color} />
                        <Text fontSize="xs" fontFamily="mono" color="gray.300">{f.label}</Text>
                    </Flex>
                ))}
            </VStack>
        );
    }

    if (type === "skills-schema") {
        return (
            <Box w="100%" bg="rgba(255,255,255,0.03)" borderRadius="10px" p={4} fontFamily="mono" fontSize="xs" color="gray.500" lineHeight={2} border="1px solid rgba(255,255,255,0.04)">
                <Text color="#4ade80" fontWeight={600}>users</Text>
                <Text pl={3}>id <Text as="span" color="gray.600">uuid pk</Text></Text>
                <Text pl={3}>email <Text as="span" color="gray.600">varchar unique</Text></Text>
                <Text pl={3}>role <Text as="span" color="gray.600">enum</Text></Text>
                <Text color="#60a5fa" fontWeight={600} mt={2}>posts</Text>
                <Text pl={3}>id <Text as="span" color="gray.600">uuid pk</Text></Text>
                <Text pl={3}>author_id <Text as="span" color="gray.600">fk → users</Text></Text>
            </Box>
        );
    }

    return <Box flex={1} />;
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

/*
  Card width: 300px on desktop.
  At initial scroll position, 3 full cards + gaps fit in the visible area,
  with the 4th card showing roughly half — clipped by the container edge.

  Math: container=1200px, pl≈82px, pr≈24px → visible≈1094px
  3×300 + 3×16(gap) = 948px → remaining 146px = ~49% of 4th card.
*/

function FeatureCard({ card }: { card: CardData }) {
    return (
        <Flex
            direction="column"
            w={{ base: "270px", md: "300px" }}
            minW={{ base: "270px", md: "300px" }}
            h={{ base: "460px", md: "520px" }}
            borderRadius="20px"
            overflow="hidden"
            position="relative"
            cursor="pointer"
            role="group"
            transition="all 0.35s cubic-bezier(0.25, 0.4, 0.25, 1)"
            bg={`linear-gradient(160deg, 
        hsla(${card.tint}, 35%, 0.6) 0%, 
        hsla(${card.tint}, 25%, 0.2) 40%,
        rgba(20, 20, 20, 0.2) 100%
      )`}
            border="1px solid"
            borderColor="rgba(255,255,255,0.02)"
            sx={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            }}
        >
            <Flex px={5} pt={5} pb={0} align="center" justify="space-between">
                <HStack spacing={3}>
                    <GlassIcon icon={card.icon} color={card.iconColor} />
                    <Text fontSize="md" fontWeight={600} color="gray.50">{card.name}</Text>
                </HStack>
                <Flex
                    w="28px"
                    h="28px"
                    borderRadius="full"
                    bg="rgba(255,255,255,0.05)"
                    border="1px solid rgba(255,255,255,0.08)"
                    align="center"
                    justify="center"
                    transition="all 0.3s"
                    _groupHover={{ bg: "rgba(255,255,255,0.08)" }}
                >
                    <Icon as={FiChevronRight} boxSize={3.5} color="gray.500" />
                </Flex>
            </Flex>

            <Box px={5} pt={3} pb={0}>
                <Text fontSize="sm" color="gray.400" lineHeight={1.6}>{card.description}</Text>
            </Box>

            <Box flex={1} px={4} pt={5} pb={5} display="flex" flexDirection="column">
                <CardVisual type={card.visual} />
            </Box>

            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                h="60px"
                bg="linear-gradient(to top, rgba(14,14,14,0.5), transparent)"
                pointerEvents="none"
                borderRadius="0 0 20px 20px"
            />
        </Flex>
    );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

const MotionFlex = motion.create(Flex);

export default function FeaturesCarouselSection() {
    const [activeTab, setActiveTab] = useState(0);
    const [scrollIndex, setScrollIndex] = useState(0);
    const cards = tabData[tabs[activeTab]];

    useEffect(() => {
        setScrollIndex(0);
    }, [activeTab]);

    const scrollByCard = useCallback(
        (dir: number) => {
            setScrollIndex((prev) =>
                Math.max(0, Math.min(prev + dir, cards.length - 1)),
            );
        },
        [cards.length],
    );

    return (
        <Box
            as="section"
            id="agents"
            py={{ base: 20, md: 32 }}
            px={0}
            position="relative"
            overflow="hidden"
        >
            {/* Row 1: Heading LEFT | Tabs RIGHT */}
            <Flex
                maxW="1100px"
                mx="auto"
                px={{ base: 5, md: 8 }}
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "start" }}
                justify="space-between"
                gap={{ base: 6, md: 0 }}
                mb={{ base: 10, md: 14 }}
            >
                <AnimatedSection>
                    <VStack align="start" spacing={0} maxW="440px">
                        <Heading
                            fontSize={{ base: "3xl", md: "3.5xl" }}
                            //fontWeight={700}
                            letterSpacing="-0.02em"
                            lineHeight={1.3}
                            color="gray.50"
                        >
                            Built for the way you work.
                        </Heading>
                        <Text fontSize={{ base: "md", md: "3.5xl" }} color="gray.400" lineHeight={1.3}>
                            Everything you need to harness agentic power, your way.
                        </Text>
                    </VStack>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <Flex
                        bg="rgba(255,255,255,0.03)"
                        border="1px solid"
                        borderColor="rgba(255,255,255,0.06)"
                        borderRadius="full"
                        p={1}
                        mt={{ base: 0, md: 1 }}
                    >
                        {tabs.map((tab, i) => (
                            <Flex
                                key={tab}
                                px={{ base: 4, md: 5 }}
                                py={2}
                                borderRadius="full"
                                cursor="pointer"
                                transition="all 0.25s ease"
                                bg={activeTab === i ? "rgba(255,255,255,0.1)" : "transparent"}
                                onClick={() => setActiveTab(i)}
                                _hover={{
                                    bg: activeTab === i ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                                }}
                            >
                                <Text
                                    fontSize="sm"
                                    fontWeight={activeTab === i ? 600 : 400}
                                    color={activeTab === i ? "gray.50" : "gray.500"}
                                    transition="color 0.25s ease"
                                    whiteSpace="nowrap"
                                >
                                    {tab}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </AnimatedSection>
            </Flex>

            {/* Row 2: Card carousel
          The cards sit inside the SAME maxW/mx/px container as the heading,
          guaranteeing the first card aligns with the heading text.
          Negative mr extends the row past the container so cards overflow right.
          translateX shifts cards left when arrows are clicked.
          overflow:hidden on the outer Box clips cards on both edges.
      */}
            <Box position="relative" overflow="hidden">
                {/* Same container as header row */}
                <Box maxW="1100px" mx="auto" px={{ base: 5, md: 8 }}>
                    {/* Extend right past the container edge */}
                    <Box mr={{ base: "-40px", md: "-300px" }}>
                        <AnimatePresence mode="wait">
                            <MotionFlex
                                key={tabs[activeTab]}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                gap={4}
                                py={4}
                                style={{
                                    transform: `translateX(-${scrollIndex * 316}px)`,
                                    transition: "transform 0.5s cubic-bezier(0.25, 0.4, 0.25, 1)",
                                }}
                            >
                                {cards.map((card) => (
                                    <Box key={card.name} flexShrink={0}>
                                        <FeatureCard card={card} />
                                    </Box>
                                ))}
                            </MotionFlex>
                        </AnimatePresence>
                    </Box>
                </Box>

                {/* Right edge fade */}
                <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    w={{ base: "80px", md: "160px" }}
                    pointerEvents="none"
                    bg="linear-gradient(to right, transparent, #171717)"
                    zIndex={2}
                />

                {/* Left edge fade — appears when cards scroll left */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    bottom={0}
                    w={{ base: "40px", md: "80px" }}
                    pointerEvents="none"
                    bg="linear-gradient(to left, transparent, #171717)"
                    zIndex={2}
                    opacity={scrollIndex > 0 ? 1 : 0}
                    transition="opacity 0.4s ease"
                />
            </Box>

            {/* Row 3: Browse left | Arrows right */}
            <Flex
                maxW="1100px"
                mx="auto"
                px={{ base: 5, md: 8 }}
                justify="flex-end"
                align="center"
                mt={6}
            >
                <HStack spacing={2}>
                    <IconButton
                        aria-label="Previous"
                        icon={<FiChevronLeft />}
                        variant="unstyled"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="40px"
                        h="40px"
                        minW="40px"
                        borderRadius="full"
                        color="gray.400"
                        bg="rgba(255,255,255,0.04)"
                        border="1px solid"
                        borderColor="rgba(255,255,255,0.08)"
                        transition="all 0.2s"
                        _hover={{ bg: "rgba(255,255,255,0.08)", color: "gray.100" }}
                        onClick={() => scrollByCard(-1)}
                        isDisabled={scrollIndex === 0}
                        opacity={scrollIndex === 0 ? 0.35 : 1}
                    />
                    <IconButton
                        aria-label="Next"
                        icon={<FiChevronRight />}
                        variant="unstyled"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="40px"
                        h="40px"
                        minW="40px"
                        borderRadius="full"
                        color="gray.400"
                        bg="rgba(255,255,255,0.04)"
                        border="1px solid"
                        borderColor="rgba(255,255,255,0.08)"
                        transition="all 0.2s"
                        _hover={{ bg: "rgba(255,255,255,0.08)", color: "gray.100" }}
                        onClick={() => scrollByCard(1)}
                        isDisabled={scrollIndex >= cards.length - 1}
                        opacity={scrollIndex >= cards.length - 1 ? 0.35 : 1}
                    />
                </HStack>
            </Flex>
        </Box>
    );
}