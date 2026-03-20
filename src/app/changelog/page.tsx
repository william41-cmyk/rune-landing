"use client";

import { useState } from "react";
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
        version: "v0.4.1",
        date: "19 March 2026",
        latest: true,
        product: "code",
        sections: [
            {
                title: "Added",
                items: [
                    "Brand highlighting utility (highlightBrands) and message transform library (transformMessages)",
                    "Generator data entries for task input",
                ],
            },
            {
                title: "Improved",
                items: [
                    "Internal rebrand — all .rune references migrated to .hugr across branch prefixes, commit messages, agent IDs, and skill filenames",
                    "AgentConfigPanel expanded with additional configuration options",
                    "TaskInput component reworked with broader input handling",
                    "SessionView expanded with additional session management features",
                    "Colors updated across the app",
                    "FileBrowser panel adjustments",
                ],
            },
        ],
    },
    {
        version: "v0.4.0",
        date: "16 March 2026",
        latest: false,
        product: "code",
        sections: [
            {
                title: "Added",
                items: [
                    "Skill creator agent — new guided skill creation pipeline that assesses, interviews, outlines, and writes SKILL.md files to ~/.claude/skills/",
                    "OpenClaw skill creator — dedicated agent for creating skills for the OpenClaw platform",
                    "Skill templates — six pre-built templates (Minimal Light UI, OpenClaw Skill, Code Analyzer, Migration Helper, API Integration, Documentation Generator) for quick-start skill creation",
                    "Skill session management — separate session type for skill creation with its own database tracking, auto-detection of created skill names, and session renaming",
                    "File attachments — upload files alongside task prompts with base64 encoding, written to .rune-uploads/ and passed through to all agents",
                    "Skills directory browsing — browse and edit ~/.claude/skills/ directly in the editor panel with a directory prompt and folder selection UI",
                    "Per-agent skill configuration — each pipeline step can now specify its own skills array, allowing different agents to use different skill files",
                    "Terminal context — extracted terminal state management into its own dedicated React context for cleaner separation from editor logic",
                ],
            },
            {
                title: "Improved",
                items: [
                    "Skills panel — completely redesigned with a Your Skills carousel showing recent creations, a templates grid, and browse/edit buttons for each skill",
                    "Inline code styling — updated to blue text with light blue background, subtle border, and larger border radius for cleaner chat appearance",
                    "Editor panel — added file tree refresh button and directory prompt UI for choosing a skills folder when no workspace is loaded",
                    "File tree — now filters out hidden files (dotfiles) across all file loading paths",
                    "Monaco editor — syncs model content when files change externally, preventing stale content after disk refreshes",
                    "Session view — expanded to support skill sessions with clarification handling, follow-up messages, pause/resume, and back-to-list navigation",
                    "Clarification system — now tracks which agent requested clarification and routes responses back to the correct agent instead of hardcoding to architect",
                    "Architect, Coder, and Reviewer agents — all now support loading custom skills from configured paths with automatic resource directory inlining",
                    "Scrollbar colors — darkened thumb and hover colors for better visibility in light theme",
                    "Markdown file icon — improved SVG path for better visual balance",
                    "Architect agent timeout — changed from 600s to unlimited for complex skill-aware tasks",
                ],
            },
            {
                title: "Removed",
                items: [
                    "Drag-and-drop editor layout — removed PopoutTab, DropZone, and all related drag-drop methods from EditorContext for a simpler editor architecture",
                    "WindowPreview and DropZoneOverlay components — removed alongside the drag-drop system",
                ],
            },
        ],
    },
    {
        version: "v0.3.1",
        date: "12 March 2026",
        latest: false,
        product: "code",
        sections: [
            {
                title: "Added",
                items: [
                    "Monaco editor — replaced embedded code-server with a native Monaco-based code editor, removing the full VS Code dependency for a lighter and faster editing experience",
                    "Language server support — LSP bridge with support for 9 languages (TypeScript, JavaScript, Python, Rust, Go, CSS, HTML, JSON, Swift, C/C++) providing autocomplete and diagnostics",
                    "File tree — visual file explorer with expand/collapse, 40+ file type icons, and color-coded folder categories",
                    "Editor tabs — multi-file tab interface with active tab highlighting, modified file indicators, and close buttons",
                    "File breadcrumbs — path navigation bar showing the current file location relative to the workspace root",
                    "Resizable editor panels — draggable dividers between file tree, editor, and terminal sections with min/max constraints",
                    "Editor theming — custom rune-dark and rune-light syntax themes with token colors for comments, strings, keywords, types, and variables",
                ],
            },
            {
                title: "Improved",
                items: [
                    "Sidebar styling — separated all sidebar layer styles and color tokens into their own namespace for independent theming",
                    "Terminal panel — moved from the editor tab bar to a dedicated resizable bottom panel",
                    "Sidebar context menu — updated overlay colors to use sidebar-specific tokens",
                    "Editor sidebar and pane tabs — updated hover and active states to use sidebar overlay system",
                    "Settings navigation — opening settings now ensures the sidebar is expanded",
                    "Translations — updated all 12 language files with new editor-related strings, removing old code-server references",
                ],
            },
            {
                title: "Removed",
                items: [
                    "Code-server — entire embedded VS Code infrastructure removed including server management, default settings, download scripts, and the CodeServerPanel component",
                ],
            },
        ],
    },
    {
        version: "v0.3.0",
        date: "11 March 2026",
        latest: false,
        product: "code",
        sections: [
            {
                title: "Added",
                items: [
                    "Internationalization — full i18n system with support for 12 languages (en, de, es, fr, hi, id, it, ja, ko, pt, ru, zh) covering 650+ translated strings across the entire UI, with DeepL-based translation automation script",
                    "Color preset system — new useColorPreset hook with 6 themes (Neutral, Warm, Cool, Rose, Emerald, Sapphire) each with light and dark variants",
                    "Custom agent pipeline handoff — structured output protocol where agents emit JSON with done status, summary, findings, and next prompt via transcript",
                    "Custom agent looping — agents can return done: false with a nextPrompt to re-enter the pipeline, with role-based default handoff messages for each agent type",
                    "Workflow templates — six default templates (Code Review, Feature Builder, Bug Fix, Research & Write, Refactoring, Testing & QA) with full i18n support",
                    "Bulk workflow management — pagination, checkbox selection, and bulk delete in the workflows overview",
                ],
            },
            {
                title: "Improved",
                items: [
                    "Settings UI — completely rewritten with tabbed architecture (General, Theme, Configuration, Data) including language selection, color preset picker, font selection, and startup behavior options",
                    "Sidebar — settings tab integration with dedicated section buttons, back navigation, and transparent background",
                    "Agent config panel — redesigned with auto-resizing textareas, new handoff message field with smart role-based defaults, and internationalized labels and tool hints",
                    "Custom agent phases — agents in the activity feed now display custom labels and colors to visually distinguish pipeline steps",
                    "Placeholder text — adjusted color in both dark and light themes for better readability",
                    "macOS window — background color now transparent for native vibrancy with backdrop filter support, while maintaining dark background on other platforms",
                    "Dev build process — new dev:core script with concurrently running core and app in parallel for faster iteration",
                    "Git tracking — now always enabled regardless of gitMode setting",
                    "App startup — supports configurable startup view (home or last session) with auto-resume capability",
                    "Pipeline data model — simplified from graph-based nodes/connections to a linear steps-based schema across database and config",
                    "Custom agent handoff parsing — changed from file-based step-output.json to inline JSON in transcript with markdown code block detection and fallback strategies",
                ],
            },
        ],
    },
    {
        version: "v0.2.2",
        date: "10 March 2026",
        latest: false,
        product: "code",
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
        product: "code",
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
        product: "code",
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
        product: "code",
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
        product: "code",
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
{
        version: "v0.1.0",
        date: "19 March 2026",
        latest: true,
        product: "hugr",
        sections: [
            {
                title: "Added",
                items: [
                    "Provider abstraction — LLMProvider interface with swappable backends, replacing the concrete ClaudeCodeProvider dependency",
                    "Provider factory (llm/factory.ts) — createProvider(), registerProvider(), listProviders() for dynamic provider registration",
                    "Shared LLM types — ExecuteOptions, ExecuteResult, StreamActivity, FileChange, CanUseToolFn, and ToolDecision extracted into types/llm.ts",
                    "Full rebrand — .rune → .hugr, agent IDs, skill filenames, config type names (RuneConfig → HugrConfig), branch prefixes, and session directory naming",
                    "Pipeline configuration — linear steps-based schema driving agent execution with custom handoff messages",
                    "Unlimited agent timeouts —  all preset agents and default provider config support long-running sessions",
                    "SkillCreator stream activity — text type instead of thinking for content events, giving consumers better signal on what is being streamed",
                ],
            },
        ],
    },
    {
        version: "v0.1.16",
        date: "6 March 2026",
        latest: true,
        product: "grab",
        sections: [
            {
                title: "Improved",
                items: [
                    "Removed unused exports and dead code across CLI, constants, frameworks, and index modules",
                ],
            },
        ],
    },
    {
        version: "v0.1.15",
        date: "6 March 2026",
        latest: false,
        product: "grab",
        sections: [
            {
                title: "Improved",
                items: [
                    "Overlay border color changed from theme variable to neutral gray for consistent visibility across themes",
                    "Selection box border updated to match the new neutral overlay styling",
                ],
            },
        ],
    },
    {
        version: "v0.1.14",
        date: "5 March 2026",
        latest: false,
        product: "grab",
        sections: [
            {
                title: "Improved",
                items: [
                    "forwardRef and memo component detection — displayName is now resolved from the wrapper first, then the inner function, fixing detection for Chakra UI components",
                    "Fallback components no longer carry misleading source locations from library internals",
                    "Source map resolution now discards results that land in library code instead of user source files",
                    "Infrastructure component filtering — stack results containing only providers and wrappers now fall back to meaningful library components instead",
                    "Refined bundle artifact filtering — relaxed overly broad path exclusions for Next.js and Vite chunks so compiled user code with source maps is no longer discarded",
                ],
            },
        ],
    },
    {
        version: "v0.1.12",
        date: "5 March 2026",
        latest: false,
        product: "grab",
        sections: [
            {
                title: "Fixed",
                items: [
                    "Component detection for Chakra UI elements in Next.js — added fallback detection for components without debug source info (e.g. server-rendered Chakra primitives)",
                ],
            },
            {
                title: "Improved",
                items: [
                    "New isCleanComponentName and isInfraName helpers to distinguish meaningful UI components from infrastructure wrappers like providers and context boundaries",
                    "Component stack now tracks fallback candidates separately, preferring user components but falling back to clean library names when no user source is found",
                    "Bundle artifact filtering — Next.js static chunks, Vite deps, and webpack runtime files are now excluded from source file detection",
                ],
            },
        ],
    },
    {
        version: "v0.1.10",
        date: "2 March 2026",
        latest: false,
        product: "grab",
        sections: [
            {
                title: "Fixed",
                items: [
                    "Auto-initialization when imported as a side effect — importing rune-grab now calls init() automatically so users don't need to wire it up manually",
                ],
            },
            {
                title: "Improved",
                items: [
                    "Vite snippet updated to use a TypeScript-safe import.meta cast",
                    "Vite entry file detection broadened to match any .ts/.tsx/.js/.jsx script reference in index.html, not just main or index files",
                ],
            },
        ],
    },
    {
        version: "v0.1.9",
        date: "2 March 2026",
        latest: false,
        product: "grab",
        sections: [
            {
                title: "Improved",
                items: [
                    "Vite integration — init snippet now injects into the JS/TS entry file instead of index.html, with automatic entry point detection from the HTML script src attribute",
                    "CLI fallback instructions updated to reference the JS entry pattern instead of an HTML script tag",
                ],
            },
            {
                title: "Added",
                items: [
                    "New logo, demo GIF, and demo video assets",
                ],
            },
        ],
    },
    {
        version: "v0.1.7",
        date: "2 March 2026",
        latest: false,
        product: "grab",
        sections: [
            {
                title: "Added",
                items: [
                    "Initial release — element inspector overlay for capturing screenshots, component hierarchy, text content, and ARIA labels from any web app",
                    "Framework detection — automatic setup for Vite, Next.js (App Router and Pages Router), and webpack projects via CLI",
                    "React, Vue, Svelte, and Solid component detection with source map resolution",
                    "Screenshot capture with configurable padding, DPR scaling, and stream reuse",
                    "Floating action menu with grab, screenshot, and context extraction controls",
                    "CLI with init and remove commands for zero-config project integration",
                ],
            },
            {
                title: "Fixed",
                items: [
                    "Screenshot permission handling — updated getDisplayMedia options for broader browser compatibility",
                ],
            },
        ],
    },
];

const tabs = [
    { key: "code", label: "Code" },
    { key: "hugr", label: "Hugr" },
    { key: "grab", label: "Grab" },
];

const subtitles: Record<string, string> = {
    code: "All the latest updates and improvements to Rune Code.",
    hugr: "All the latest updates and improvements to Hugr Framework.",
    grab: "All the latest updates and improvements to Rune Grab.",
};

export default function ChangelogPage() {
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";
    const c = colors(isDark);
    const [activeTab, setActiveTab] = useState("code");

    const filtered = releases.filter((r) => r.product === activeTab);

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
                            {subtitles[activeTab]}
                        </Text>
                    </VStack>
                </Box>
                <HStack
                    position="relative"
                    zIndex={3}
                    spacing={0}
                    mx="auto"
                    mb={2}
                >
                    {tabs.map((tab) => (
                        <Box
                            key={tab.key}
                            as="button"
                            onClick={() => setActiveTab(tab.key)}
                            px={5}
                            py={2}
                            fontSize="sm"
                            fontWeight={600}
                            letterSpacing="-0.03em"
                            color={activeTab === tab.key ? c.text.primary : c.text.muted}
                            borderBottom="2px solid"
                            borderColor={activeTab === tab.key ? c.text.primary : "transparent"}
                            transition="all 0.15s ease"
                            _hover={{
                                color: c.text.secondary,
                            }}
                            bg="transparent"
                            cursor="pointer"
                        >
                            {tab.label}
                        </Box>
                    ))}
                </HStack>
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
                    {filtered.map((release) => (
                        <Box
                            key={`${release.product}-${release.version}`}
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
                                color={c.text.muted}
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