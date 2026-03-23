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
    SimpleGrid,
    useColorMode,
} from "@chakra-ui/react";
import {
    FiArrowLeft,
    FiCopy,
    FiTerminal,
    FiLayers,
    FiGitBranch,
    FiZap,
    FiShield,
    FiBox,
    FiRefreshCw,
    FiSliders,
    FiAlertTriangle,
    FiPauseCircle,
    FiEye,
    FiPackage,
    FiActivity,
    FiCpu,
    FiDatabase,
    FiBell,
    FiDollarSign,
    FiCode,
    FiNavigation,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { colors } from "@/theme/colors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelBlast from "@/components/PixelBlast";

const features = [
    {
        icon: FiLayers,
        title: "Multi-agent orchestration",
        description: "Define agents, wire them together, and let the framework handle routing, retries, and state.",
    },
    {
        icon: FiGitBranch,
        title: "Provider agnostic",
        description: "Swap between OpenAI, Anthropic, local models, or your own endpoints without changing your workflow logic.",
    },
    {
        icon: FiZap,
        title: "Streaming by default",
        description: "Every agent step streams output in real-time. No polling, no waiting for full completions.",
    },
    {
        icon: FiShield,
        title: "Built-in guardrails",
        description: "Autonomy controls, rate limit detection, and an interrupt system to keep agents in check during execution.",
    },
    {
        icon: FiBox,
        title: "Tool system",
        description: "Give agents access to functions, APIs, file systems, or custom tools with a simple interface.",
    },
    {
        icon: FiRefreshCw,
        title: "Stateful workflows",
        description: "Persist conversation history, share context between agents, and resume workflows where they left off.",
    },
    {
        icon: FiSliders,
        title: "Workflow presets",
        description: "Choose from built-in pipelines like fast, balanced, or thorough — or define your own in YAML with per-step agent configuration.",
    },
    {
        icon: FiAlertTriangle,
        title: "Error recovery",
        description: "Automatic retries, crash-safe persistence, and auto-resume after rate limits. Jobs pick up where they left off.",
    },
    {
        icon: FiPauseCircle,
        title: "Interrupt control",
        description: "Stop, redirect, or modify running agents mid-task. Built into the base agent class for human-in-the-loop workflows.",
    },
    {
        icon: FiEye,
        title: "Visual agent",
        description: "Give agents eyes. Let them launch browsers, take screenshots, and iterate on UI with vision-based feedback loops.",
    },
    {
        icon: FiPackage,
        title: "Plugin system",
        description: "Publish and install reusable agent packages — custom tools, skills, and pipelines.",
    },
    {
        icon: FiActivity,
        title: "Observability dashboard",
        description: "Trace every decision and tool call across your pipeline. Debug agent behavior with full execution timelines.",
    },
    {
        icon: FiCpu,
        title: "Parallel execution",
        description: "Run multiple agents simultaneously across branches of a pipeline. Fan out work and merge results.",
    },
    {
        icon: FiDatabase,
        title: "Memory layer",
        description: "Give agents long-term memory that persists across sessions. Semantic search over past interactions, decisions, and outputs.",
    },
    {
        icon: FiBell,
        title: "Webhooks & triggers",
        description: "Kick off pipelines from external events — git pushes, API calls, cron schedules, or file changes.",
    },
    {
        icon: FiDollarSign,
        title: "Cost controls",
        description: "Set token budgets per agent, per pipeline, or per run. Get alerts before spending thresholds are hit.",
    },
    {
        icon: FiCode,
        title: "Custom agent SDK",
        description: "Define your own agents with a simple base class, lifecycle hooks, and automatic integration into the pipeline system.",
    },
    {
        icon: FiNavigation,
        title: "Multi-model routing",
        description: "Route different pipeline steps to different models based on complexity, cost, or latency. Use a fast model for triage, a strong one for implementation.",
    },
];

export default function FrameworkPage() {
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";
    const c = colors(isDark);

    return (
        <Box minH="100vh" bg={c.bg} overflowX="hidden">
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

                {/* ── Hero ──────────────────────────────────────────── */}
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
                        w="450px"
                        h="45px"
                        borderRadius="20px"
                        bg={c.bg}
                        boxShadow={`0 0 60px 60px ${c.bg}`}
                        pointerEvents="none"
                        zIndex={1}
                    />
                    {/* Mask for subtitle */}
                    <Box
                        position="absolute"
                        top="62%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="450px"
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
                            Hugr
                        </Heading>

                        <Text
                            letterSpacing="-0.03em"
                            fontSize={{ base: "lg", md: "1xl", lg: "3xl" }}
                            color={c.text.secondary}
                            fontWeight={500}
                            lineHeight={1.5}
                            maxW="550px"
                        >
                            An open source framework for building and chaining multi-agent workflows in TypeScript.
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
                                TypeScript
                            </Badge>
                        </HStack>
                    </VStack>
                </Box>

                {/* ── Install ──────────────────────────────────────── */}
                <Box px={{ base: 5, md: 8 }} pb={{ base: 10, md: 16 }} position="relative" zIndex={2}>
                    <VStack spacing={10} maxW="700px" mx="auto">
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
                                            npm i @runeltd/hugr
                                        </Code>
                                    </HStack>
                                </Flex>
                            </Box>
                        </VStack>
                    </VStack>
                </Box>

                {/* ── Features ─────────────────────────────────────── */}
                <Box px={{ base: 5, md: 8 }} pb={{ base: 16, md: 24 }}>
                    <VStack spacing={10} maxW="900px" mx="auto">
                        <Text
                            fontSize="sm"
                            fontWeight={600}
                            color={c.text.subtle}
                            textTransform="uppercase"
                            letterSpacing="0.08em"
                        >
                            Features
                        </Text>

                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w="full">
                            {features.map((feature) => (
                                <Box
                                    key={feature.title}
                                    bg={c.overlay.subtle}
                                    border="1px solid"
                                    borderColor={c.border.faint}
                                    borderRadius="lg"
                                    px={5}
                                    py={5}
                                >
                                    <HStack spacing={3} align="start">
                                        <Flex
                                            w="36px"
                                            h="36px"
                                            borderRadius="10px"
                                            align="center"
                                            justify="center"
                                            bg={c.overlay.hover}
                                            flexShrink={0}
                                            mt={0.5}
                                        >
                                            <Icon as={feature.icon} boxSize={4} color={c.text.secondary} />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="sm" fontWeight={600} color={c.text.primary} letterSpacing="-0.03em">
                                                {feature.title}
                                            </Text>
                                            <Text fontSize="xs" color={c.text.muted} mt={1} lineHeight={1.5} letterSpacing="-0.03em">
                                                {feature.description}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Box>

                {/* ── Quick example ─────────────────────────────────── */}
                <Box px={{ base: 5, md: 8 }} pb={{ base: 16, md: 24 }}>
                    <VStack spacing={6} maxW="700px" mx="auto">
                        <Text
                            fontSize="sm"
                            fontWeight={600}
                            color={c.text.subtle}
                            textTransform="uppercase"
                            letterSpacing="0.08em"
                        >
                            Quick start
                        </Text>
                        <Box
                            w="full"
                            bg={c.overlay.soft}
                            border="1px solid"
                            borderColor={c.border.faint}
                            borderRadius="lg"
                            px={6}
                            py={5}
                            fontFamily="mono"
                            fontSize="sm"
                            color={c.text.secondary}
                            lineHeight={1.8}
                            overflowX="auto"
                        >
                            <Text letterSpacing="-0.03em"><Box as="span" color={c.text.muted}>{"import"}</Box>{" {"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"Manager,"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"Joblog,"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"JsonlStorage,"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"ClaudeCodeProvider,"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"loadConfig,"}</Text>
                            <Text letterSpacing="-0.03em">{"} "}<Box as="span" color={c.text.muted}>{"from"}</Box>{" "}<Box as="span" color={c.text.primary}>{"'@runeltd/hugr'"}</Box>{";"}</Text>

                            <Text mt={3} letterSpacing="-0.03em"><Box as="span" color={c.text.muted}>{"const"}</Box>{" projectPath = process.cwd();"}</Text>
                            <Text letterSpacing="-0.03em"><Box as="span" color={c.text.muted}>{"const"}</Box>{" config = "}<Box as="span" color={c.text.muted}>{"await"}</Box>{" loadConfig({ projectPath, preset: "}<Box as="span" color={c.text.primary}>{"'balanced'"}</Box>{" });"}</Text>

                            <Text mt={3} letterSpacing="-0.03em"><Box as="span" color={c.text.muted}>{"const"}</Box>{" storage = "}<Box as="span" color={c.text.muted}>{"new"}</Box>{" JsonlStorage("}<Box as="span" color={c.text.primary}>{"'/tmp/hugr-demo'"}</Box>{");"}</Text>
                            <Text letterSpacing="-0.03em"><Box as="span" color={c.text.muted}>{"const"}</Box>{" joblog = "}<Box as="span" color={c.text.muted}>{"new"}</Box>{" Joblog({ storage });"}</Text>

                            <Text mt={3} letterSpacing="-0.03em"><Box as="span" color={c.text.muted}>{"const"}</Box>{" llm = "}<Box as="span" color={c.text.muted}>{"new"}</Box>{" ClaudeCodeProvider({"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"projectPath,"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"timeout: config.provider.timeout,"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"maxRetries: config.provider.maxRetries,"}</Text>
                            <Text letterSpacing="-0.03em">{"});"}</Text>

                            <Text mt={3} letterSpacing="-0.03em"><Box as="span" color={c.text.muted}>{"const"}</Box>{" manager = "}<Box as="span" color={c.text.muted}>{"new"}</Box>{" Manager({ joblog, llm, config, projectPath });"}</Text>

                            <Text mt={3} letterSpacing="-0.03em">{"manager.on("}<Box as="span" color={c.text.primary}>{"'activity'"}</Box>{", ({ type, message, agentName }) => {"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"console.log("}<Box as="span" color={c.text.primary}>{"`[${agentName ?? type}] ${message}`"}</Box>{");"}</Text>
                            <Text letterSpacing="-0.03em">{"});"}</Text>

                            <Text mt={3} letterSpacing="-0.03em"><Box as="span" color={c.text.muted}>{"await"}</Box>{" manager.runSession({"}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"task: "}<Box as="span" color={c.text.primary}>{"'Research the top 5 competitors and summarise their pricing models'"}</Box>{","}</Text>
                            <Text pl={4} letterSpacing="-0.03em">{"sessionId: "}<Box as="span" color={c.text.primary}>{"'demo-001'"}</Box>{","}</Text>
                            <Text letterSpacing="-0.03em">{"});"}</Text>
                        </Box>
                    </VStack>
                </Box>

                {/* ── Dashboard ────────────────────────────────────── */}
                <Box px={{ base: 5, md: 8 }} pb={{ base: 16, md: 24 }}>
                    <VStack spacing={6} maxW="700px" mx="auto">
                        <Text
                            fontSize="sm"
                            fontWeight={600}
                            color={c.text.subtle}
                            textTransform="uppercase"
                            letterSpacing="0.08em"
                        >
                            Dashboard
                        </Text>

                        <Text
                            fontSize="md"
                            color={c.text.secondary}
                            lineHeight={1.7}
                            letterSpacing="-0.03em"
                            textAlign="center"
                        >
                            Hugr includes a web-based dashboard for managing everything visually:
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
                                        npx hugr-dashboard
                                    </Code>
                                </HStack>
                            </Flex>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                            {[
                                { icon: FiActivity, title: "Overview", description: "Active sessions, total sessions, registered workers, saved workflows at a glance." },
                                { icon: FiGitBranch, title: "Workflows", description: "Build pipelines visually from templates or from scratch. Drag and drop workers, configure iterations, and enable/disable steps." },
                                { icon: FiTerminal, title: "Sessions", description: "Pick a workflow, describe a task, and run it. Watch live activity as workers hand off to each other. Respond to clarification questions in real time. Stop sessions mid-run." },
                                { icon: FiCpu, title: "Workers", description: "Browse the built-in library and preset workers, or create your own with a custom name, description, system prompt, tool selection, and skill files from anywhere on your filesystem." },
                                { icon: FiBell, title: "Triggers", description: "Automate workflows with cron schedules, webhooks, HTTP polling, and file system watchers. 20+ built-in templates to get started." },
                                { icon: FiSliders, title: "Settings", description: "Configure API keys for all supported providers (OpenAI, Anthropic, Gemini, Mistral, xAI, Groq, AWS Bedrock), manage your data storage path, check runtime status, and set your theme." },
                            ].map((item) => (
                                <Box
                                    key={item.title}
                                    bg={c.overlay.subtle}
                                    border="1px solid"
                                    borderColor={c.border.faint}
                                    borderRadius="lg"
                                    px={5}
                                    py={5}
                                >
                                    <HStack spacing={3} align="start">
                                        <Flex
                                            w="36px"
                                            h="36px"
                                            borderRadius="10px"
                                            align="center"
                                            justify="center"
                                            bg={c.overlay.hover}
                                            flexShrink={0}
                                            mt={0.5}
                                        >
                                            <Icon as={item.icon} boxSize={4} color={c.text.secondary} />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="sm" fontWeight={600} color={c.text.primary} letterSpacing="-0.03em">
                                                {item.title}
                                            </Text>
                                            <Text fontSize="xs" color={c.text.muted} mt={1} lineHeight={1.5} letterSpacing="-0.03em">
                                                {item.description}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Box>

                {/* ── CTA ──────────────────────────────────────────── */}
                <Box px={{ base: 5, md: 8 }} pb={{ base: 16, md: 24 }}>
                    <VStack spacing={4} maxW="700px" mx="auto" textAlign="center">
                        <HStack spacing={3}>
                            <Button
                                as="a"
                                href="https://github.com/RuneLtd/hugr"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                bg={c.overlay.medium}
                                color={c.text.secondary}
                                fontWeight={500}
                                fontSize="sm"
                                borderRadius="full"
                                px={5}
                                leftIcon={<FaGithub size={14} />}
                                border="1px solid"
                                borderColor={c.border.faint}
                                _hover={{
                                    bg: c.overlay.hover,
                                    color: c.text.primary,
                                    borderColor: c.border.default,
                                }}
                                transition="all 0.2s"
                            >
                                View on GitHub
                            </Button>
                            <Button
                                as="a"
                                href="https://www.npmjs.com/package/@runeltd/hugr"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                bg="transparent"
                                color={c.text.secondary}
                                fontWeight={500}
                                fontSize="sm"
                                border="1px solid"
                                borderColor={c.border.subtle}
                                borderRadius="full"
                                px={5}
                                _hover={{
                                    bg: c.overlay.hover,
                                    color: c.text.primary,
                                    borderColor: c.border.default,
                                }}
                                transition="all 0.2s"
                            >
                                npm
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
