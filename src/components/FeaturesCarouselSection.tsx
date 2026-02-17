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
    Badge,
    Switch,
} from "@chakra-ui/react";
import {
    FiChevronLeft,
    FiChevronRight,
    FiChevronDown,
    FiCheck,
    FiGitBranch,
    FiGitMerge,
    FiPlay,
    FiCpu,
    FiRefreshCw,
    FiFileText,
    FiSettings,
    FiCode,
    FiHelpCircle,
    FiSend,
    FiSkipForward,
    FiCornerUpRight,
    FiSliders,
    FiEye,
    FiPackage,
    FiGrid,
    FiTrash2,
    FiZap,
    FiCheckCircle,
    FiShield,
    FiActivity,
    FiGlobe,
    FiServer,
    FiDroplet,
    FiDatabase,
    FiSmartphone,
} from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Rune design tokens (from colors.ts) ───────────────────────────────── */

const rune = {
    bg: {
        primary: "#0d0d0d",
        secondary: "#171717",
        tertiary: "#1c1c1c",
        cards: "#161616",
        surface: "#111111",
    },
    text: {
        primary: "#f5f5f5",
        secondary: "#b3b3b3",
        muted: "#8a8a8a",
        subtle: "#6b6b6b",
        placeholder: "#525252",
    },
    border: {
        subtle: "#262626",
        default: "#3a3a3a",
        strong: "#525252",
    },
    overlay: {
        subtle: "rgba(255,255,255,0.03)",
        soft: "rgba(255,255,255,0.05)",
        hover: "rgba(255,255,255,0.08)",
        strong: "rgba(255,255,255,0.12)",
        border: "rgba(255,255,255,0.08)",
        borderStrong: "rgba(255,255,255,0.15)",
        grid: "rgba(255,255,255,0.04)",
    },
    accent: {
        green: "#22c55e",
        red: "#ef4444",
        amber: "#f59e0b",
        blue: "#3b82f6",
        purple: "#a855f7",
        pink: "#ec4899",
        yellow: "#ffc600",
    },
    agent: {
        architect: "#a855f7",
        coder: "#8a8a8a",
        raven: "#22c55e",
        manager: "#6b6b6b",
    },
    activity: {
        thinking: { color: "#6366f1", accent: "#818cf8" },
        reading: { color: "#8ab4f8", accent: "#bfdbfe" },
        writing: { color: "#fb923c", accent: "#fdba74" },
        editing: { color: "#f472b6", accent: "#f9a8d4" },
        running: { color: "#34d399", accent: "#6ee7b7" },
        analyzing: { color: "#f97316", accent: "#fb923c" },
        reviewing: { color: "#c084fc", accent: "#d8b4fe" },
    },
    tool: {
        read: "#8a8a8a",
        write: "#22c55e",
        edit: "#ffc600",
        bash: "#fcd34d",
        glob: "#8a8a8a",
        grep: "#8a8a8a",
    },
    diff: {
        codeBg: "rgba(22,22,22,0.95)",
        add: { color: "#3fb950", bg: "rgba(46,160,67,0.12)" },
        remove: { color: "#f85149", bg: "rgba(248,81,73,0.12)" },
    },
} as const;

/* ─── GlassIcon ─────────────────────────────────────────────────────────── */

function GlassIcon({ icon: IconComponent }: { icon: any; color: string }) {
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

/* ─── ActivityIcon (SVG — matches real ActivityIcon.tsx exactly) ─────────── */

const activityPresets: Record<string, {
    color: string; accent: string; accentCells: number[]; duration: number;
    stagger: number[];
}> = {
    thinking: {
        color: rune.activity.thinking.color,
        accent: rune.activity.thinking.accent,
        accentCells: [1, 3, 5, 7],
        duration: 1.8,
        stagger: [0, 1, 2, 1, 2, 3, 2, 3, 4],
    },
    reading: {
        color: rune.activity.reading.color,
        accent: rune.activity.reading.accent,
        accentCells: [2, 5, 8],
        duration: 2.0,
        stagger: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    writing: {
        color: rune.activity.writing.color,
        accent: rune.activity.writing.accent,
        accentCells: [2, 3, 8],
        duration: 1.6,
        stagger: [0, 1, 2, 5, 4, 3, 6, 7, 8],
    },
    editing: {
        color: rune.activity.editing.color,
        accent: rune.activity.editing.accent,
        accentCells: [1, 4, 7],
        duration: 1.8,
        stagger: [6, 7, 8, 5, 4, 3, 0, 1, 2],
    },
    running: {
        color: rune.activity.running.color,
        accent: rune.activity.running.accent,
        accentCells: [0, 4, 8],
        duration: 1.4,
        stagger: [2, 1, 0, 3, 2, 1, 4, 3, 2],
    },
    analyzing: {
        color: rune.activity.analyzing.color,
        accent: rune.activity.analyzing.accent,
        accentCells: [0, 2, 6, 8],
        duration: 2.2,
        stagger: [0, 3, 1, 5, 8, 7, 6, 2, 4],
    },
    reviewing: {
        color: rune.activity.reviewing.color,
        accent: rune.activity.reviewing.accent,
        accentCells: [0, 2, 6, 8],
        duration: 2.0,
        stagger: [4, 3, 2, 3, 2, 1, 2, 1, 0],
    },
};

function ActivityIconMini({ type, size = 14 }: { type: string; size?: number }) {
    const preset = activityPresets[type] || activityPresets.thinking;
    const gap = 1;
    const cellSize = (size - gap * 2) / 3;
    const maxOrder = Math.max(...preset.stagger);
    const delayPerStep = preset.duration / (maxOrder + 2);
    const accentSet = new Set(preset.accentCells);

    return (
        <Box as="span" display="inline-flex" alignItems="center" justifyContent="center" w={`${size}px`} h={`${size}px`} flexShrink={0}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <style>{`
                    @keyframes activity-pulse {
                        0%, 100% { opacity: 0; }
                        10% { opacity: 1; }
                        40% { opacity: 0; }
                    }
                `}</style>
                {Array.from({ length: 9 }, (_, i) => {
                    const row = Math.floor(i / 3);
                    const col = i % 3;
                    const x = col * (cellSize + gap);
                    const y = row * (cellSize + gap);
                    const fill = accentSet.has(i) ? preset.accent : preset.color;
                    const delay = preset.stagger[i] * delayPerStep;
                    return (
                        <rect
                            key={i}
                            x={x}
                            y={y}
                            width={cellSize}
                            height={cellSize}
                            rx={0.5}
                            fill={fill}
                            style={{
                                animation: `activity-pulse ${preset.duration}s ease-in-out infinite`,
                                animationDelay: `${delay}s`,
                            }}
                        />
                    );
                })}
            </svg>
        </Box>
    );
}

/* ─── Tab data ──────────────────────────────────────────────────────────── */

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
            name: "Agent Presets",
            icon: FiRefreshCw,
            iconColor: "purple",
            description: "Choose a preset loop from Fast prototyping to Thorough production quality — each with different review depth.",
            tint: "270, 75%",
            visual: "agent-presets",
        },
        {
            name: "Tool Transparency",
            icon: FiEye,
            iconColor: "blue",
            description: "Every file read, write, edit, and command is logged with expandable diffs and outputs.",
            tint: "210, 75%",
            visual: "tool-cards",
        },
        {
            name: "Stack Config",
            icon: FiCode,
            iconColor: "green",
            description: "Tell agents your tech stack — languages, frameworks, databases, and practices — so they match your project.",
            tint: "150, 65%",
            visual: "stack-config",
        },
        {
            name: "Git Worktrees",
            icon: FiGitBranch,
            iconColor: "amber",
            description: "Every session runs in its own git worktree — isolated branches, zero stash juggling, full parallel development.",
            tint: "35, 80%",
            visual: "git-worktrees",
        },
        {
            name: "Session Recovery",
            icon: FiCornerUpRight,
            iconColor: "purple",
            description: "Sessions persist to a local database. Resume, redirect, or fork any interrupted session instantly.",
            tint: "270, 75%",
            visual: "session-recovery",
        },
    ],
    Framework: [
        {
            name: "rune/core",
            icon: FiPackage,
            iconColor: "purple",
            description: "Install the core as an npm dependency. Build any multi-agent system on top — not just code generation.",
            tint: "270, 75%",
            visual: "framework-core",
        },
        {
            name: "Custom Agents",
            icon: FiCpu,
            iconColor: "blue",
            description: "Define agents with custom instructions, tool permissions, and looping — wire them into any topology.",
            tint: "210, 75%",
            visual: "framework-agents",
        },
        {
            name: "Visual Pipelines",
            icon: FiGitMerge,
            iconColor: "green",
            description: "Design workflows on a node canvas. Drag, connect, and configure agents without writing orchestration code.",
            tint: "150, 65%",
            visual: "framework-canvas",
        },
        {
            name: "Any Workflow",
            icon: FiGrid,
            iconColor: "amber",
            description: "Not just coding. Build research agents, customer service swarms, data pipelines — anything multi-agent.",
            tint: "35, 80%",
            visual: "framework-usecases",
        },
    ],
    Skills: [
        {
            name: "Clarification Cards",
            icon: FiHelpCircle,
            iconColor: "purple",
            description: "Architect asks smart clarifying questions with selectable options before writing a single line.",
            tint: "270, 75%",
            visual: "clarification",
        },
        {
            name: "Custom Skills",
            icon: FiFileText,
            iconColor: "blue",
            description: "Teach agents your codebase conventions with markdown skill files they read at runtime.",
            tint: "210, 75%",
            visual: "custom-skills",
        },
        {
            name: "Autonomy Levels",
            icon: FiSliders,
            iconColor: "green",
            description: "Choose Supervised, Balanced, or Auto mode to control how much oversight you want.",
            tint: "150, 65%",
            visual: "autonomy",
        },
    ],
};

const tabs = Object.keys(tabData);

/* ─── Card visuals ──────────────────────────────────────────────────────── */

function CardVisual({ type }: { type: string }) {

    /* ═══════ Sessions: Agent Presets ═══════ */
    /* Mirrors presets.ts — Fast, Balanced, Quality, Thorough with pipeline flow */
    if (type === "agent-presets") {
        const presets = [
            { id: "fast", label: "Fast", icon: FiZap, desc: "Quick architect + coding. No review.", pipeline: "Architect (quick) → Coder", tokens: "2-4k", active: false },
            { id: "balanced", label: "Balanced", icon: FiActivity, desc: "Thorough architect + one Raven review.", pipeline: "Architect → Coder → Raven", tokens: "4-8k", active: true },
            { id: "quality", label: "Quality", icon: FiCheckCircle, desc: "Two Raven reviews. For production code.", pipeline: "Architect → Coder → Raven ×2", tokens: "8-15k", active: false },
            { id: "thorough", label: "Thorough", icon: FiShield, desc: "Three Raven reviews. Maximum quality.", pipeline: "Architect → Coder → Raven ×3", tokens: "15-30k", active: false },
        ];
        return (
            <VStack spacing={0} align="stretch" w="100%" flex={1}>
                {presets.map((p, i) => (
                    <Box
                        key={p.id}
                        py={2.5}
                        px={3}
                        borderRadius="lg"
                        bg={p.active ? rune.overlay.soft : "transparent"}
                    >
                        <HStack spacing={2.5} mb={1}>
                            <Icon as={p.icon} boxSize="13px" color={p.active ? rune.text.primary : rune.text.subtle} />
                            <Text fontSize="xs" fontWeight="semibold" color={p.active ? rune.text.primary : rune.text.secondary} flex={1}>
                                {p.label}
                            </Text>
                            {p.active && (
                                <Box w="8px" h="8px" borderRadius="full" border="2px solid" borderColor={rune.text.primary}>
                                    <Box w="100%" h="100%" borderRadius="full" bg={rune.text.primary} />
                                </Box>
                            )}
                            {!p.active && (
                                <Box w="8px" h="8px" borderRadius="full" border="1.5px solid" borderColor={rune.text.placeholder} />
                            )}
                        </HStack>
                        <HStack spacing={1.5} pl="25px">
                            <Text fontSize="2xs" color={rune.text.muted} fontFamily="mono" flex={1} noOfLines={1}>{p.pipeline}</Text>
                            <Text fontSize="2xs" color={rune.text.placeholder} fontFamily="mono" flexShrink={0}>{p.tokens}</Text>
                        </HStack>
                    </Box>
                ))}
                {/* Footer showing active preset summary */}
                <Box px={3} pt={3} mt="auto">
                    <Box h="1px" bg={rune.overlay.grid} mb={3} />
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color={rune.text.placeholder}>Active preset</Text>
                        <HStack spacing={1.5}>
                            <Icon as={FiActivity} boxSize="10px" color={rune.text.secondary} />
                            <Text fontSize="2xs" fontFamily="mono" color={rune.text.secondary} fontWeight="medium">Balanced</Text>
                        </HStack>
                    </HStack>
                </Box>
            </VStack>
        );
    }

    /* ═══════ Sessions: Stack Config ═══════ */
    /* Mirrors StackConfig.tsx — dropdowns for project type, languages, frameworks */
    if (type === "stack-config") {
        const sections = [
            { label: "Project Type", icon: FiGlobe, value: "Web App" },
            { label: "Languages", icon: FiCode, value: "TypeScript, Python" },
            { label: "Frontend", icon: FiGlobe, value: "React, Next.js" },
            { label: "Backend", icon: FiServer, value: "Express" },
            { label: "Style Library", icon: FiDroplet, value: "Chakra UI" },
            { label: "Database", icon: FiDatabase, value: "PostgreSQL, Redis" },
            { label: "Platform", icon: FiSmartphone, value: "Desktop (Electron)" },
            { label: "Practices", icon: FiCheckCircle, value: "ESLint, Prettier" },
        ];
        return (
            <VStack spacing={0} align="stretch" w="100%" flex={1}>
                {sections.map((s, i) => (
                    <HStack
                        key={s.label}
                        py={2}
                        px={1}
                        spacing={3}
                        borderBottom={i < sections.length - 1 ? "1px solid" : "none"}
                        borderColor={rune.overlay.grid}
                    >
                        <Icon as={s.icon} boxSize="12px" color={rune.text.placeholder} flexShrink={0} />
                        <Text fontSize="xs" color={rune.text.subtle} minW="72px" flexShrink={0}>
                            {s.label}
                        </Text>
                        <Text fontSize="xs" fontFamily="mono" color={rune.text.secondary} flex={1} noOfLines={1}>
                            {s.value}
                        </Text>
                        <Icon as={FiChevronDown} boxSize="10px" color={rune.text.placeholder} flexShrink={0} />
                    </HStack>
                ))}
            </VStack>
        );
    }

    /* ═══════ Sessions: Tool Cards ═══════ */
    /* Matches ToolCard.tsx — borderLeft, HStack spacing={0}, py={1.5} px={2} */
    /* Write tool is expanded to show code content */
    if (type === "tool-cards") {
        const collapsedTools = [
            { name: "Read", input: "src/App.tsx", color: rune.tool.read, activity: "reading", stat: "0.2s" },
            { name: "Edit", input: "src/utils/api.ts", color: rune.tool.edit, activity: "editing", stat: "0.8s" },
            { name: "Bash", input: "npm run build", color: rune.tool.bash, activity: "running", stat: null, running: true },
        ];
        return (
            <VStack spacing={0} align="stretch" flex={1}>
                <Box py={1} borderLeft="1px solid" borderColor={rune.overlay.grid} ml={1}>
                    <VStack spacing={0} align="stretch">
                        {/* Read — collapsed */}
                        <HStack spacing={0} py={1.5} px={2} borderRadius="md">
                            <Icon as={FiChevronRight} boxSize={3} color={rune.text.placeholder} mr={2} flexShrink={0} />
                            <ActivityIconMini type="reading" size={14} />
                            <Text fontFamily="mono" fontSize="xs" color={rune.tool.read} fontWeight="semibold" ml={2} flexShrink={0}>Read</Text>
                            <Text fontFamily="mono" fontSize="xs" color={rune.text.muted} ml={2} flex={1} noOfLines={1}>src/App.tsx</Text>
                            <Text fontFamily="mono" fontSize="2xs" color={rune.text.subtle} ml={2}>0.2s</Text>
                        </HStack>

                        {/* Write — expanded with code */}
                        <Box>
                            <HStack spacing={0} py={1.5} px={2} borderRadius="md">
                                <Icon as={FiChevronDown} boxSize={3} color={rune.text.secondary} mr={2} flexShrink={0} />
                                <ActivityIconMini type="writing" size={14} />
                                <Text fontFamily="mono" fontSize="xs" color={rune.tool.write} fontWeight="semibold" ml={2} flexShrink={0}>Write</Text>
                                <Text fontFamily="mono" fontSize="xs" color={rune.text.muted} ml={2} flex={1} noOfLines={1}>src/components/Auth.tsx</Text>
                                <Text fontFamily="mono" fontSize="2xs" color={rune.text.subtle} ml={2}>1.4s</Text>
                            </HStack>
                            {/* Expanded code content */}
                            <Box ml={7} mr={1} mb={1} py={2} px={2.5} borderRadius="md" bg={rune.overlay.soft} fontFamily="mono" fontSize="2xs" lineHeight={1.9}>
                                <Text color={rune.diff.add.color}><Text as="span" color={rune.text.placeholder}>+</Text> {"export function AuthProvider({ children }) {"}</Text>
                                <Text color={rune.diff.add.color}><Text as="span" color={rune.text.placeholder}>+</Text> {"  const [user, setUser] = useState(null)"}</Text>
                                <Text color={rune.diff.add.color}><Text as="span" color={rune.text.placeholder}>+</Text> {"  const session = useSession()"}</Text>
                                <Text color={rune.text.placeholder}>{"   ..."}</Text>
                                <Text color={rune.diff.add.color}><Text as="span" color={rune.text.placeholder}>+</Text> {"  return <AuthCtx value={user}>"}</Text>
                                <Text color={rune.diff.add.color}><Text as="span" color={rune.text.placeholder}>+</Text> {"    {children}"}</Text>
                                <Text color={rune.diff.add.color}><Text as="span" color={rune.text.placeholder}>+</Text> {"  </AuthCtx>"}</Text>
                            </Box>
                        </Box>

                        {/* Edit — collapsed */}
                        <HStack spacing={0} py={1.5} px={2} borderRadius="md">
                            <Icon as={FiChevronRight} boxSize={3} color={rune.text.placeholder} mr={2} flexShrink={0} />
                            <ActivityIconMini type="editing" size={14} />
                            <Text fontFamily="mono" fontSize="xs" color={rune.tool.edit} fontWeight="semibold" ml={2} flexShrink={0}>Edit</Text>
                            <Text fontFamily="mono" fontSize="xs" color={rune.text.muted} ml={2} flex={1} noOfLines={1}>src/utils/api.ts</Text>
                            <Text fontFamily="mono" fontSize="2xs" color={rune.text.subtle} ml={2}>0.8s</Text>
                        </HStack>

                        {/* Bash — collapsed, running */}
                        <HStack spacing={0} py={1.5} px={2} borderRadius="md">
                            <Icon as={FiChevronRight} boxSize={3} color={rune.text.placeholder} mr={2} flexShrink={0} />
                            <ActivityIconMini type="running" size={14} />
                            <Text fontFamily="mono" fontSize="xs" color={rune.tool.bash} fontWeight="semibold" ml={2} flexShrink={0}>Bash</Text>
                            <Text fontFamily="mono" fontSize="xs" color={rune.text.muted} ml={2} flex={1} noOfLines={1}>npm run build</Text>
                            <HStack spacing={2} ml={2} flexShrink={0}>
                                <Text fontFamily="mono" fontSize="2xs" color={rune.text.subtle}>3.1s</Text>
                                <Box w="5px" h="5px" borderRadius="full" bg="#fcd34d" sx={{ animation: "pulse 1.4s ease-in-out infinite" }} />
                            </HStack>
                        </HStack>
                    </VStack>
                </Box>
            </VStack>
        );
    }

    /* ═══════ Sessions: Session Recovery ═══════ */
    if (type === "session-recovery") {
        const sessions = [
            { task: "Add auth flow with OAuth", agents: "architect, coder, raven", status: "completed", statusColor: rune.accent.green, time: "12m 34s", files: 8 },
            { task: "Fix CORS middleware", agents: "coder, raven", status: "interrupted", statusColor: rune.accent.amber, time: "4m 12s", files: 3 },
            { task: "Refactor DB schema", agents: "architect, coder", status: "recoverable", statusColor: rune.accent.blue, time: "8m 01s", files: 5 },
            { task: "Setup CI/CD pipeline", agents: "architect, coder", status: "completed", statusColor: rune.accent.green, time: "6m 18s", files: 4 },
            { task: "Add rate limiting", agents: "coder, raven", status: "completed", statusColor: rune.accent.green, time: "3m 45s", files: 2 },
        ];
        return (
            <VStack spacing={0} align="stretch" w="100%" flex={1}>
                {sessions.map((s, i) => (
                    <Box
                        key={i}
                        px={1}
                        py={2.5}
                        borderBottom={i < sessions.length - 1 ? "1px solid" : "none"}
                        borderColor={rune.overlay.grid}
                    >
                        <HStack spacing={2.5} mb={1}>
                            <Box w="5px" h="5px" borderRadius="full" bg={s.statusColor} flexShrink={0} />
                            <Text fontSize="xs" fontWeight={500} color={rune.text.primary} noOfLines={1} flex={1}>
                                {s.task}
                            </Text>
                            <Text fontSize="2xs" fontFamily="mono" color={s.statusColor}>{s.status}</Text>
                        </HStack>
                        <HStack spacing={2} pl="17px">
                            <Text fontSize="2xs" color={rune.text.subtle}>{s.agents}</Text>
                            <Text fontSize="xs" color={rune.text.placeholder}>·</Text>
                            <Text fontSize="2xs" fontFamily="mono" color={rune.text.subtle}>{s.time}</Text>
                            <Text fontSize="xs" color={rune.text.placeholder}>·</Text>
                            <Text fontSize="2xs" fontFamily="mono" color={rune.text.subtle}>{s.files} files</Text>
                        </HStack>
                    </Box>
                ))}
            </VStack>
        );
    }

    /* ═══════ Framework: @rune/core ═══════ */
    if (type === "framework-core") {
        return (
            <Box
                w="100%"
                py={3}
                px={3}
                fontFamily="mono"
                fontSize="xs"
                lineHeight={2}
                overflow="hidden"
                flex={1}
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                bg={rune.overlay.soft}
                borderRadius="md"
            >
                <Text color={rune.text.subtle}>{"// install as a dependency"}</Text>
                <Text><Text as="span" color={rune.accent.purple}>import</Text>{" { Manager, Agent }"}</Text>
                <Text>{"  "}<Text as="span" color={rune.accent.purple}>from</Text> <Text as="span" color={rune.accent.green}>{`'@rune/core'`}</Text></Text>
                <Box h="4px" />
                <Text color={rune.text.subtle}>{"// define your own agent"}</Text>
                <Text><Text as="span" color={rune.accent.purple}>class</Text> <Text as="span" color={rune.accent.blue}>Analyst</Text> <Text as="span" color={rune.accent.purple}>extends</Text> <Text as="span" color={rune.accent.blue}>Agent</Text> {"{"}</Text>
                <Text>{"  "}<Text as="span" color={rune.accent.purple}>async</Text> <Text as="span" color={rune.activity.writing.accent}>handle</Text>{"(msg) {"}</Text>
                <Text color={rune.text.subtle}>{"    // your domain logic"}</Text>
                <Text>{"  }"}</Text>
                <Text>{"}"}</Text>
                <Box h="4px" />
                <Text color={rune.text.subtle}>{"// compose & run"}</Text>
                <Text><Text as="span" color={rune.accent.purple}>const</Text> mgr = <Text as="span" color={rune.accent.purple}>new</Text> <Text as="span" color={rune.accent.blue}>Manager</Text>{"({ pipeline })"}</Text>
                <Text><Text as="span" color={rune.accent.purple}>await</Text> mgr.<Text as="span" color={rune.activity.writing.accent}>run</Text>()</Text>
            </Box>
        );
    }

    /* ═══════ Framework: Custom Agents ═══════ */
    /* Matches PipelineNodeBox expanded view — borderless, merges with card */
    if (type === "framework-agents") {
        return (
            <VStack spacing={0} align="stretch" w="100%" flex={1}>
                {/* Header */}
                <HStack spacing={2.5} px={1} py={2} align="center">
                    <Box flexShrink={0} display="flex" alignItems="center" justifyContent="center" w="28px" h="28px">
                        <svg width="28" height="28" viewBox="0 0 28 28">
                            <defs>
                                <linearGradient id="ag-analyst" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                            <circle cx="14" cy="14" r="9" fill="none" stroke="url(#ag-analyst)" strokeWidth="4.5" />
                        </svg>
                    </Box>
                    <Text fontSize="sm" fontWeight="semibold" color={rune.text.primary} flex={1}>
                        Data Analyst
                    </Text>
                    <Box p={1} borderRadius="md" color={rune.text.placeholder} flexShrink={0}>
                        <FiTrash2 size={12} />
                    </Box>
                </HStack>

                {/* Field rows — no outer box, just dividers */}
                <Box px={1}>
                    {/* Instructions */}
                    <HStack justify="space-between" align="start" spacing={3} py={2.5} borderBottom="1px solid" borderColor={rune.overlay.grid}>
                        <Text fontSize="xs" color={rune.text.subtle} flexShrink={0} pt={0.5} minW="70px">Instructions</Text>
                        <Text fontSize="xs" fontFamily="mono" color={rune.text.secondary} flex={1}>
                            Analyze datasets, generate insights, produce reports
                        </Text>
                    </HStack>
                    {/* Tool Access */}
                    <HStack justify="space-between" align="center" spacing={3} py={2.5} borderBottom="1px solid" borderColor={rune.overlay.grid}>
                        <Text fontSize="xs" color={rune.text.subtle} flexShrink={0} minW="70px">Tool Access</Text>
                        <HStack spacing={0} bg={rune.overlay.soft} p="2px" borderRadius="lg" flex={1}>
                            {[
                                { label: "Full", active: true },
                                { label: "Read", active: false },
                                { label: "Bash", active: false },
                            ].map((opt) => (
                                <Box
                                    key={opt.label}
                                    flex={1}
                                    px={2}
                                    py={1}
                                    bg={opt.active ? rune.overlay.strong : "transparent"}
                                    borderRadius="md"
                                    textAlign="center"
                                >
                                    <Text fontSize="2xs" fontWeight="medium" color={opt.active ? rune.text.primary : rune.text.muted}>
                                        {opt.label}
                                    </Text>
                                </Box>
                            ))}
                        </HStack>
                    </HStack>
                    {/* Can Loop */}
                    <HStack justify="space-between" align="center" spacing={3} py={2.5} borderBottom="1px solid" borderColor={rune.overlay.grid}>
                        <Text fontSize="xs" color={rune.text.subtle} flexShrink={0} minW="70px">Can Loop</Text>
                        <Switch size="sm" isChecked colorScheme="gray" pointerEvents="none" />
                    </HStack>
                    {/* Model */}
                    <HStack justify="space-between" align="center" spacing={3} py={2.5} borderBottom="1px solid" borderColor={rune.overlay.grid}>
                        <Text fontSize="xs" color={rune.text.subtle} flexShrink={0} minW="70px">Model</Text>
                        <HStack spacing={1.5} bg={rune.overlay.soft} px={2.5} py={1} borderRadius="md">
                            <Text fontSize="2xs" fontFamily="mono" color={rune.text.secondary}>Claude Sonnet</Text>
                            <Icon as={FiChevronDown} boxSize="10px" color={rune.text.placeholder} />
                        </HStack>
                    </HStack>
                    {/* Memory */}
                    <HStack justify="space-between" align="center" spacing={3} py={2.5} borderBottom="1px solid" borderColor={rune.overlay.grid}>
                        <Text fontSize="xs" color={rune.text.subtle} flexShrink={0} minW="70px">Memory</Text>
                        <HStack spacing={0} bg={rune.overlay.soft} p="2px" borderRadius="lg" flex={1}>
                            {[
                                { label: "None", active: false },
                                { label: "Shared", active: true },
                                { label: "Full", active: false },
                            ].map((opt) => (
                                <Box
                                    key={opt.label}
                                    flex={1}
                                    px={2}
                                    py={1}
                                    bg={opt.active ? rune.overlay.strong : "transparent"}
                                    borderRadius="md"
                                    textAlign="center"
                                >
                                    <Text fontSize="2xs" fontWeight="medium" color={opt.active ? rune.text.primary : rune.text.muted}>
                                        {opt.label}
                                    </Text>
                                </Box>
                            ))}
                        </HStack>
                    </HStack>
                    {/* Color */}
                    <HStack justify="space-between" align="center" spacing={3} py={2.5}>
                        <Text fontSize="xs" color={rune.text.subtle} flexShrink={0} minW="70px">Color</Text>
                        <HStack spacing={1.5}>
                            {[rune.text.primary, rune.accent.purple, rune.accent.blue, rune.accent.green, rune.accent.amber, rune.accent.red, rune.accent.pink].map(
                                (color) => (
                                    <Box
                                        key={color}
                                        w="16px"
                                        h="16px"
                                        borderRadius="sm"
                                        bg={color}
                                        opacity={color === rune.accent.blue ? 1 : 0.4}
                                    />
                                ),
                            )}
                        </HStack>
                    </HStack>
                </Box>
            </VStack>
        );
    }

    /* ═══════ Framework: Visual Pipelines ═══════ */
    /* Canvas with dashed grid bg + PipelineNodeBox compact nodes + Bezier curves */
    if (type === "framework-canvas") {
        return (
            <Box w="100%" position="relative" flex={1}>
                {/* Dashed grid background — matches NodeEditorCanvas */}
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                    <defs>
                        <pattern id="feat-grid" x="0" y="0" width="50" height="12" patternUnits="userSpaceOnUse" patternTransform="translate(40, 0)">
                            <line x1="0.5" y1="0" x2="0.5" y2="12" stroke={rune.overlay.grid} strokeWidth="2" strokeDasharray="6 6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#feat-grid)" />
                </svg>

                {/* Node boxes — PipelineNodeBox compact, gradient agent logos */}
                <VStack spacing={2} position="relative" zIndex={2} align="start" py={2} flex={1}>
                    {[
                        { name: "Validator", gradFrom: "#3b82f6", gradTo: "#06b6d4", access: "Read only", loop: false, id: "v" },
                        { name: "Analyzer", gradFrom: "#a855f7", gradTo: "#ec4899", access: "Full access", loop: true, id: "a" },
                        { name: "Reporter", gradFrom: "#22c55e", gradTo: "#06b6d4", access: "Bash", loop: false, id: "r" },
                        { name: "Deployer", gradFrom: "#f59e0b", gradTo: "#ef4444", access: "Full access", loop: false, id: "d" },
                    ].map((node) => (
                        <Box
                            key={node.name}
                            bg={rune.overlay.soft}
                            borderRadius="xl"
                            w="100%"
                            position="relative"
                        >
                            <HStack px={3} py={2.5} spacing={3} align="center">
                                <Box flexShrink={0} display="flex" alignItems="center" justifyContent="center" w="28px" h="28px">
                                    <svg width="28" height="28" viewBox="0 0 28 28">
                                        <defs>
                                            <linearGradient id={`ag-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor={node.gradFrom} />
                                                <stop offset="100%" stopColor={node.gradTo} />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="14" cy="14" r="9" fill="none" stroke={`url(#ag-${node.id})`} strokeWidth="4.5" />
                                    </svg>
                                </Box>
                                <Box>
                                    <Text fontSize="sm" fontWeight="semibold" color={rune.text.primary} noOfLines={1}>
                                        {node.name}
                                    </Text>
                                    <HStack spacing={2} mt={0.5}>
                                        <Text fontSize="2xs" color={rune.text.subtle}>{node.access}</Text>
                                        {node.loop && <Text fontSize="2xs" color={rune.text.subtle}>Loop</Text>}
                                    </HStack>
                                </Box>
                            </HStack>
                            {/* Input port */}
                            <Box
                                position="absolute"
                                left="-5px"
                                top="50%"
                                transform="translateY(-50%)"
                                w="8px"
                                h="8px"
                                borderRadius="full"
                                bg={rune.overlay.hover}
                            />
                            {/* Output port */}
                            <Box
                                position="absolute"
                                right="-5px"
                                top="50%"
                                transform="translateY(-50%)"
                                w="8px"
                                h="8px"
                                borderRadius="full"
                                bg={rune.overlay.hover}
                            />
                        </Box>
                    ))}
                </VStack>
            </Box>
        );
    }

    /* ═══════ Framework: Any Workflow ═══════ */
    /* Non-coding pipeline examples showing the framework isn't limited to code gen */
    if (type === "framework-usecases") {
        const pipelines = [
            {
                name: "Research Pipeline",
                agents: [
                    { name: "Scraper", id: "uc-scr", from: "#3b82f6", to: "#06b6d4" },
                    { name: "Synthesizer", id: "uc-syn", from: "#a855f7", to: "#ec4899" },
                    { name: "Writer", id: "uc-wri", from: "#22c55e", to: "#06b6d4" },
                ],
            },
            {
                name: "Customer Service",
                agents: [
                    { name: "Classifier", id: "uc-cls", from: "#f59e0b", to: "#ef4444" },
                    { name: "Resolver", id: "uc-res", from: "#3b82f6", to: "#a855f7" },
                    { name: "Escalator", id: "uc-esc", from: "#ef4444", to: "#ec4899" },
                ],
            },
            {
                name: "Data Analysis",
                agents: [
                    { name: "Validator", id: "uc-val", from: "#3b82f6", to: "#06b6d4" },
                    { name: "Analyzer", id: "uc-ana", from: "#a855f7", to: "#ec4899" },
                    { name: "Reporter", id: "uc-rep", from: "#22c55e", to: "#06b6d4" },
                ],
            },
            {
                name: "Content Pipeline",
                agents: [
                    { name: "Drafter", id: "uc-drf", from: "#ec4899", to: "#a855f7" },
                    { name: "Editor", id: "uc-edt", from: "#3b82f6", to: "#22c55e" },
                    { name: "Publisher", id: "uc-pub", from: "#22c55e", to: "#f59e0b" },
                ],
            },
        ];
        return (
            <VStack spacing={2} align="stretch" w="100%" flex={1}>
                {pipelines.map((p) => (
                    <Box key={p.name} px={1} py={2.5} borderRadius="lg">
                        <Text fontSize="xs" fontWeight="semibold" color={rune.text.primary} mb={2} letterSpacing="0.02em">
                            {p.name}
                        </Text>
                        <HStack spacing={0}>
                            {p.agents.map((agent, i) => (
                                <HStack key={agent.name} spacing={0} flex={1}>
                                    <HStack spacing={1.5} flex={1} align="center">
                                        <Box flexShrink={0}>
                                            <svg width="12" height="12" viewBox="0 0 12 12">
                                                <defs>
                                                    <linearGradient id={agent.id} x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor={agent.from} />
                                                        <stop offset="100%" stopColor={agent.to} />
                                                    </linearGradient>
                                                </defs>
                                                <circle cx="6" cy="6" r="3.5" fill="none" stroke={`url(#${agent.id})`} strokeWidth="2.5" />
                                            </svg>
                                        </Box>
                                        <Text fontSize="2xs" fontFamily="mono" color={rune.text.secondary}>{agent.name}</Text>
                                    </HStack>
                                    {i < p.agents.length - 1 && (
                                        <Text fontSize="xs" color={rune.text.placeholder} mx={1}>→</Text>
                                    )}
                                </HStack>
                            ))}
                        </HStack>
                    </Box>
                ))}
            </VStack>
        );
    }

    /* ═══════ Skills: Clarification Cards ═══════ */
    /* Matches ClarificationCard.tsx — bg={overlay.hover}, borderRadius="md" */
    if (type === "clarification") {
        return (
            <VStack spacing={0} align="stretch" w="100%" flex={1}>
                {/* Header */}
                <HStack spacing={2} px={1} py={2} borderBottom="1px solid" borderColor={rune.overlay.grid}>
                    <Icon as={FiHelpCircle} color={rune.text.subtle} boxSize={4} />
                    <Text fontWeight="semibold" color={rune.text.primary} fontSize="sm">
                        Architect has questions
                    </Text>
                </HStack>

                {/* Question */}
                <Box px={1} py={3} borderBottom="1px solid" borderColor={rune.overlay.grid}>
                    <Text fontSize="sm" color={rune.text.secondary} mb={1} fontWeight="medium">
                        Where should auth state live?
                    </Text>
                    <Text fontSize="xs" color={rune.text.muted} mb={2.5}>
                        Determines the state management approach
                    </Text>
                    <Flex flexWrap="wrap" gap={1.5}>
                        {["React Context", "Zustand", "Redux"].map((opt, i) => (
                            <Box
                                key={opt}
                                px={3}
                                py={1.5}
                                fontSize="xs"
                                fontWeight="medium"
                                borderRadius="md"
                                bg={i === 1 ? rune.overlay.hover : rune.overlay.soft}
                                color={i === 1 ? rune.text.primary : rune.text.muted}
                            >
                                {opt}
                            </Box>
                        ))}
                        <Box
                            px={3}
                            py={1.5}
                            fontSize="xs"
                            fontWeight="medium"
                            borderRadius="md"
                            bg="transparent"
                            color={rune.text.placeholder}
                        >
                            <HStack spacing={1}>
                                <Icon as={FiSkipForward} boxSize={3} />
                                <Text>Skip</Text>
                            </HStack>
                        </Box>
                    </Flex>
                </Box>

                {/* Question 2 */}
                <Box px={1} py={3} borderBottom="1px solid" borderColor={rune.overlay.grid}>
                    <Text fontSize="sm" color={rune.text.secondary} mb={1} fontWeight="medium">
                        Session storage strategy?
                    </Text>
                    <Text fontSize="xs" color={rune.text.muted} mb={2.5}>
                        How tokens persist across requests
                    </Text>
                    <Flex flexWrap="wrap" gap={1.5}>
                        {["HTTP-only Cookie", "localStorage", "Memory"].map((opt, i) => (
                            <Box
                                key={opt}
                                px={3}
                                py={1.5}
                                fontSize="xs"
                                fontWeight="medium"
                                borderRadius="md"
                                bg={rune.overlay.soft}
                                color={rune.text.muted}
                            >
                                {opt}
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </VStack>
        );
    }

    /* ═══════ Skills: Custom Skills ═══════ */
    /* Styled like a diff code block — diff.codeBg, mono, real markdown content */
    if (type === "custom-skills") {
        return (
            <Box w="100%" py={1} px={1} fontFamily="mono" fontSize="xs" lineHeight={2.2} flex={1} display="flex" flexDirection="column" justifyContent="flex-start">
                <Text color={rune.accent.blue} fontWeight={600}># API Conventions</Text>
                <Text color={rune.text.placeholder}>---</Text>
                <Text color={rune.text.muted}>Use <Text as="span" color={rune.text.secondary}>zod</Text> for all request validation</Text>
                <Text color={rune.text.muted}>Return <Text as="span" color={rune.text.secondary}>{"{ data, error }"}</Text> envelope</Text>
                <Text color={rune.text.muted}>Prefix routes with <Text as="span" color={rune.text.secondary}>/api/v1/</Text></Text>
                <Text color={rune.accent.blue} fontWeight={600} mt={2}># Component Rules</Text>
                <Text color={rune.text.placeholder}>---</Text>
                <Text color={rune.text.muted}>Handle <Text as="span" color={rune.text.secondary}>loading, error, empty</Text> states</Text>
                <Text color={rune.text.muted}>Use <Text as="span" color={rune.text.secondary}>async/await</Text>, never callbacks</Text>
                <Text color={rune.text.muted}>Colocate <Text as="span" color={rune.text.secondary}>types</Text> with components</Text>
            </Box>
        );
    }

    /* ═══════ Skills: Autonomy Levels ═══════ */
    /* Three modes with radio-style selection */
    if (type === "autonomy") {
        const levels = [
            { name: "Supervised", desc: "Approve every tool call. You see each step before it runs.", color: rune.accent.blue, active: false, tools: "All tools gated" },
            { name: "Balanced", desc: "Auto-approve reads. Confirm writes, edits, and commands.", color: rune.text.secondary, active: true, tools: "Writes & bash gated" },
            { name: "Auto", desc: "Full autonomy. Agents run the entire loop without pausing.", color: rune.accent.green, active: false, tools: "No gates" },
        ];
        return (
            <VStack spacing={0} align="stretch" w="100%" flex={1}>
                {levels.map((l, i) => (
                    <HStack
                        key={i}
                        py={3}
                        px={3}
                        borderRadius="lg"
                        bg={l.active ? rune.overlay.soft : "transparent"}
                        justify="space-between"
                        align="start"
                    >
                        <Box flex={1}>
                            <Text fontSize="xs" fontFamily="mono" fontWeight="semibold" color={l.active ? l.color : rune.text.muted}>
                                {l.name}
                            </Text>
                            <Text fontSize="xs" color={rune.text.muted} mt={1} lineHeight={1.5}>{l.desc}</Text>
                            <Text fontSize="2xs" fontFamily="mono" color={rune.text.placeholder} mt={1.5}>{l.tools}</Text>
                        </Box>
                        <Box
                            w="16px"
                            h="16px"
                            borderRadius="full"
                            border="1.5px solid"
                            borderColor={l.active ? l.color : rune.overlay.grid}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {l.active && <Box w="8px" h="8px" borderRadius="full" bg={l.color} />}
                        </Box>
                    </HStack>
                ))}
            </VStack>
        );
    }

    /* ═══════ Sessions: Git Worktrees ═══════ */
    /* Shows a mini git branch diagram with worktree isolation */
    if (type === "git-worktrees") {
        const worktrees = [
            { branch: "main", status: "clean", files: 0, active: false },
            { branch: "feat/auth", status: "session-1", files: 4, active: true },
            { branch: "fix/nav-bug", status: "session-2", files: 2, active: false },
        ];
        return (
            <VStack spacing={0} align="stretch" w="100%" flex={1}>
                {/* Branch list */}
                {worktrees.map((w, i) => (
                    <HStack
                        key={i}
                        py={2.5}
                        px={3}
                        borderRadius="lg"
                        bg={w.active ? rune.overlay.soft : "transparent"}
                        spacing={3}
                    >
                        <Box position="relative" display="flex" alignItems="center" justifyContent="center" w="16px" flexShrink={0}>
                            <Box w="8px" h="8px" borderRadius="full" bg={w.active ? rune.text.primary : rune.text.placeholder} />
                        </Box>
                        <Box flex={1}>
                            <HStack spacing={2} mb={0.5}>
                                <Text fontSize="xs" fontFamily="mono" fontWeight="semibold" color={w.active ? rune.text.primary : rune.text.muted}>
                                    {w.branch}
                                </Text>
                                {w.active && (
                                    <Box w="8px" h="8px" borderRadius="full" border="2px solid" borderColor={rune.text.primary}>
                                        <Box w="100%" h="100%" borderRadius="full" bg={rune.text.primary} />
                                    </Box>
                                )}
                                {!w.active && (
                                    <Box w="8px" h="8px" borderRadius="full" border="1.5px solid" borderColor={rune.text.placeholder} />
                                )}
                            </HStack>
                            <Text fontSize="2xs" fontFamily="mono" color={rune.text.placeholder}>
                                {w.files > 0 ? `${w.files} changed files · ${w.status}` : w.status}
                            </Text>
                        </Box>
                        <Icon as={FiGitBranch} boxSize="12px" color={w.active ? rune.text.secondary : rune.text.placeholder} />
                    </HStack>
                ))}
                {/* Footer */}
                <Box px={3} pt={3} mt="auto">
                    <Box h="1px" bg={rune.overlay.grid} mb={3} />
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color={rune.text.placeholder}>Worktrees</Text>
                        <HStack spacing={1.5}>
                            <Icon as={FiGitBranch} boxSize="10px" color={rune.text.secondary} />
                            <Text fontSize="2xs" fontFamily="mono" color={rune.text.secondary} fontWeight="medium">3 active</Text>
                        </HStack>
                    </HStack>
                </Box>
            </VStack>
        );
    }

    return <Box flex={1} />;
}

/* ─── Feature card (STYLING UNTOUCHED) ──────────────────────────────────── */

function FeatureCard({ card }: { card: CardData }) {
    return (
        <Flex
            direction="column"
            w={{ base: "270px", md: "300px" }}
            minW={{ base: "270px", md: "300px" }}
            h={{ base: "460px", md: "520px" }}
            borderRadius="20px"
            overflow="hidden"
            cursor="pointer"
            role="group"
            transition="all 0.2s"
            bg="rgba(255,255,255,0.04)"
            border="1px solid"
            borderColor="rgba(255,255,255,0.08)"
        >
            <Flex direction="column" h="100%">
                <Flex px={5} pt={5} pb={0} align="center" justify="space-between">
                    <HStack spacing={3}>
                        <GlassIcon icon={card.icon} color={card.iconColor} />
                        <Text fontSize="md" fontWeight={600} color="gray.50">{card.name}</Text>
                    </HStack>
                    <Flex
                        w="28px"
                        h="28px"
                        borderRadius="full"
                        bg="rgba(255,255,255,0.04)"
                        border="1px solid rgba(255,255,255,0.08)"
                        align="center"
                        justify="center"
                        transition="all 0.2s"
                        _groupHover={{ bg: "rgba(255,255,255,0.08)", color: "gray.100" }}
                    >
                        <Icon as={FiChevronRight} boxSize={3.5} color="gray.400" />
                    </Flex>
                </Flex>

                <Box px={5} pt={3} pb={0}>
                    <Text fontSize="sm" color="gray.400" lineHeight={1.6}>{card.description}</Text>
                </Box>

                <Box flex={1} px={4} pt={5} pb={5} display="flex" flexDirection="column">
                    <CardVisual type={card.visual} />
                </Box>
            </Flex>
        </Flex>
    );
}

/* ─── Main section (STYLING UNTOUCHED) ──────────────────────────────────── */

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
                <VStack align="start" spacing={0} maxW="440px">
                    <Heading
                        fontSize={{ base: "3xl", md: "3.5xl" }}
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
            </Flex>

            {/* Row 2: Card carousel */}
            <Box position="relative" overflow="hidden">
                <Box maxW="1100px" mx="auto" px={{ base: 5, md: 8 }}>
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
                    bg={`linear-gradient(to right, transparent, ${rune.bg.secondary})`}
                    zIndex={2}
                />

                {/* Left edge fade */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    bottom={0}
                    w={{ base: "40px", md: "80px" }}
                    pointerEvents="none"
                    bg={`linear-gradient(to left, transparent, ${rune.bg.secondary})`}
                    zIndex={2}
                    opacity={scrollIndex > 0 ? 1 : 0}
                    transition="opacity 0.4s ease"
                />
            </Box>

            {/* Row 3: Arrows */}
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
