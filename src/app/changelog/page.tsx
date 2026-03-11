"use client";

import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    useColorMode,
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelBlast from "@/components/PixelBlast";

const releases = [
    {
        version: "v0.2.2",
        date: "10 March 2026",
        latest: true,
        sections: [
            {
                title: "Added",
                items: [
                    "Auto mode — analyzes task prompts with Haiku to automatically select the right workflow (single, fast, or balanced), now the default preset",
                ],
            },
            {
                title: "Improved",
                items: [
                    "Pipeline data model — simplified from graph-based nodes/connections to a linear steps-based schema across database and config",
                    "Activity events — agents now emit named phases in the UI with agentName and agentId fields, filtering out empty descriptions",
                    "Session navigation — switching to settings, skills, or pipelines views now clears the active session to prevent stale state",
                    "Session setup — deferred initialization wrapped in async error handling with session:error events sent to renderer on failure",
                ],
            },
        ],
    },
    {
        version: "v0.2.1",
        date: "6 March 2026",
        latest: false,
        sections: [
            {
                title: "Added",
                items: [
                    "Theme system — new centralized color architecture with light and dark mode support via theme-aware hooks",
                    "useFont hook — font customization via CSS variables with per-session font loading",
                    "Step results tracking — session state now records step-by-step agent execution for better activity visibility",
                ],
            },
            {
                title: "Improved",
                items: [
                    "Component architecture — reorganized editor components into panels/, banners/, sidebar/, and views/ subdirectories for cleaner project structure",
                    "Color system — rebuilt with centralized palette definitions and useColors/useThemeMode hooks replacing scattered inline values",
                    "Electron upgraded to latest version with electron-builder bumped to ^26.8.1",
                    "Settings UI — consolidated into a single unified component, removing the old multi-section layout",
                    "Task input — simplified component structure with better image attachment handling and recovery mode UI for resuming interrupted sessions",
                    "Agent system — pipeline configuration now fully drives agent execution instead of legacy mode strings",
                    "Interrupt handling — improved detection and handling across agent lifecycle",
                    "Joblog — better logging and tracking of agent activities",
                    "Git operations — improved worktree and branch management",
                    "Chat components — updated ActivityIcon, AgentStatusBar, CompletionSummary, ThinkingAccordion, and ToolCard to use the new color system",
                    "Session components — refined ActivityGroup, BranchSelector, ClarificationCard, CompletionCard, SessionHeader, and ThinkingIndicator styling",
                ],
            },
        ],
    },
    {
        version: "v0.2.0",
        date: "1 March 2026",
        latest: false,
        sections: [
            {
                title: "Added",
                items: [
                    "Grab mode — element inspector for the built-in browser that captures screenshots, component hierarchy, text, and ARIA labels as referenceable context for sessions",
                    "Database-backed persistence — workspaces, sessions, and draft attachments now stored in SQLite instead of localStorage, with automatic migration on first launch",
                    "Draft attachments — images and grab references persist to the database before a session starts, surviving tab switches and app restarts",
                    "PromptCreator — structured prompt builder with inline pill dropdowns for action, project type, and stack selection",
                    "Authentication error detection — new AuthErrorBanner with recovery instructions when Claude Code auth fails mid-session",
                    "Database row deletion — checkbox selection and bulk delete in the database explorer panel",
                    "Pending terminal input — ability to pre-fill terminal text from other parts of the app (e.g. auth recovery banner)",
                    "Status page integration in settings — live Claude API status indicators via Atlassian Statuspage",
                ],
            },
            {
                title: "Improved",
                items: [
                    "Sidebar collapse — collapsed state now shows icon and label buttons at 90px width instead of hiding entirely, with session status dots and pulsing indicators for running sessions",
                    "Settings UI — redesigned with card-based sections, confirm dialogs for destructive actions, and clear sessions/cache buttons",
                    "Settings quick menu — streamlined with better visual hierarchy",
                    "Terminal panel — spawns in the active workspace path, auto-creates a fresh terminal on session switch, and cleans up old terminals",
                    "Code server folder management — session switch now shows only the active session's folder instead of accumulating all previously opened folders",
                    "Skill version migration — skills are automatically cleared and re-installed on app version upgrade",
                    "Claude config auto-recovery — detects corrupted .claude.json files and restores from Claude Code's backup directory",
                    "Concurrent CLI status check guard — prevents multiple renderer calls from racing and corrupting config",
                    "HomeView workspace list — shows top 5 most recently used workspaces sorted by latest session activity",
                    "DevTools blocking — switched from keyboard shortcut interception to devtools-opened event for more reliable blocking",
                ],
            },
            {
                title: "Fixed",
                items: [
                    "Stale draft data lost on tab switch or unmount",
                    "Code server showing folders from previous sessions after switching workspaces",
                    "Terminal not following workspace path on session change",
                ],
            },
        ],
    },
    {
        version: "v0.1.1",
        date: "26 February 2026",
        latest: false,
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
                        top="48%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="200px"
                        h="30px"
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
                        w="320px"
                        h="10px"
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
                            Changelog
                        </Heading>

                        <Text
                letterSpacing="-0.03em"
                            fontSize={{ base: "lg", md: "1xl", lg: "3xl" }}
                            color={c.text.secondary}
                            fontWeight={500}
                            lineHeight={1.5}
                            maxW="550px"
                        >
                            All the latest updates and improvements to Rune.
                        </Text>
                    </VStack>
                </Box>
                <VStack
                    position="relative"
                    zIndex={3}
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
                            borderColor={c.border.subtle}
                        >
                            <HStack spacing={3} mb={2} align="center">
                                <Text
                letterSpacing="-0.03em"
                                    fontSize="2xl"
                                    fontWeight={700}
                                    fontFamily="var(--font-geist-mono)"
                                    sx={{
                                        background: c.text.primary,
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {release.version}
                                </Text>
                                {release.latest && (
                                    <Text
                letterSpacing="-0.03em"
                                        fontSize="xs"
                                        fontWeight={600}
                                        color={c.text.subtle}
                                    >
                                        latest
                                    </Text>
                                )}
                            </HStack>

                            <Text
                letterSpacing="-0.03em"
                                fontSize="sm"
                                color={c.text.placeholder}
                                fontWeight={500}
                                mb={8}
                            >
                                {release.date}
                            </Text>
                            <VStack spacing={6} align="stretch">
                                {release.sections.map((section) => (
                                    <Box key={section.title}>
                                        <Text
                letterSpacing="-0.03em"
                                            fontSize="sm"
                                            fontWeight={700}
                                            color={c.text.secondary}
                                            mb={3}
                                        >
                                            {section.title}
                                        </Text>
                                        <VStack spacing={1.5} align="stretch" pl={2}>
                                            {section.items.map((item, i) => (
                                                <HStack key={i} spacing={2} align="start">
                                                    <Text
                letterSpacing="-0.03em"
                                                        fontSize="sm"
                                                        color={c.text.placeholder}
                                                        userSelect="none"
                                                        lineHeight={1.7}
                                                    >
                                                        -
                                                    </Text>
                                                    <Text
                letterSpacing="-0.03em"
                                                        fontSize="sm"
                                                        color={c.text.muted}
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