"use client";

import {
  Box, Flex, Heading, Text, VStack, HStack, Icon, Input,
  InputGroup, InputLeftElement, Collapse, Image, Button,
  Link as ChakraLink, Code,
} from "@chakra-ui/react";
import {
  FiSearch, FiChevronDown, FiChevronRight, FiChevronLeft,
  FiPlay, FiSettings, FiCpu, FiGitBranch, FiLayers,
  FiTerminal, FiMenu, FiX, FiZap, FiSliders, FiShield,
  FiCloud, FiBook, FiInfo, FiAlertCircle, FiCode, FiGlobe,
  FiLayout, FiMaximize2, FiColumns, FiMove, FiMonitor,
} from "react-icons/fi";
import Link from "next/link";
import { useState, useCallback, useMemo, useEffect, ReactNode, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { IconType } from "react-icons";

interface SidebarItem { label: string; slug: string }
interface SidebarSection { title: string; icon: IconType; items: SidebarItem[] }
interface TocItem { label: string; id: string; depth: number }
interface PageContent {
  title: string;
  subtitle: string;
  section: string;
  toc: TocItem[];
  content: ReactNode;
  prev?: { label: string; slug: string };
  next?: { label: string; slug: string };
}

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Heading id={id} fontSize="xl" fontWeight={700} letterSpacing="-0.01em"
      color="gray.50" mt={10} mb={4} scrollMarginTop="80px">
      {children}
    </Heading>
  );
}

function SubHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Heading id={id} fontSize="md" fontWeight={600} letterSpacing="-0.01em"
      color="gray.200" mt={8} mb={3} scrollMarginTop="80px">
      {children}
    </Heading>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <Text fontSize="sm" color="gray.300" lineHeight={1.85} mb={4}>
      {children}
    </Text>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <Code bg="rgba(255,255,255,0.06)" color="gray.200" px={1.5} py={0.5}
      borderRadius="4px" fontSize="xs" fontFamily="mono">
      {children}
    </Code>
  );
}

function CodeBlock({ children, language }: { children: string; language?: string }) {
  return (
    <Box bg="rgba(255,255,255,0.03)" border="1px solid" borderColor="rgba(255,255,255,0.06)"
      borderRadius="10px" p={4} mb={4} overflowX="auto"
      sx={{ "&::-webkit-scrollbar": { height: "4px" }, "&::-webkit-scrollbar-thumb": { bg: "rgba(255,255,255,0.1)", borderRadius: "full" } }}>
      <Code display="block" whiteSpace="pre" bg="transparent" color="gray.500"
        fontSize="xs" lineHeight={1.7} fontFamily="'JetBrains Mono', monospace"
        fontStyle="italic">
        Currently unavailable
      </Code>
    </Box>
  );
}

function Callout({ title, icon, children }: { title: string; icon?: IconType; children: ReactNode }) {
  return (
    <Box bg="rgba(255,255,255,0.03)" border="1px solid" borderColor="rgba(255,255,255,0.08)"
      borderRadius="10px" p={4} mb={4}>
      <HStack spacing={2} mb={2}>
        {icon && <Icon as={icon} boxSize={3.5} color="gray.400" />}
        <Text fontSize="sm" fontWeight={600} color="gray.200">{title}</Text>
      </HStack>
      <Text fontSize="sm" color="gray.400" lineHeight={1.7}>{children}</Text>
    </Box>
  );
}

function FeatureCard({ icon, title, desc }: { icon: IconType; title: string; desc: string }) {
  return (
    <Box bg="rgba(255,255,255,0.02)" border="1px solid" borderColor="rgba(255,255,255,0.06)"
      borderRadius="10px" p={4}>
      <HStack spacing={2.5} mb={2}>
        <Icon as={icon} boxSize={4} color="gray.400" />
        <Text fontSize="sm" fontWeight={600} color="gray.200">{title}</Text>
      </HStack>
      <Text fontSize="xs" color="gray.400" lineHeight={1.7}>{desc}</Text>
    </Box>
  );
}

const sidebarData: SidebarSection[] = [
  {
    title: "Getting Started",
    icon: FiPlay,
    items: [
      { label: "Introduction", slug: "introduction" },
      { label: "Installation", slug: "installation" },
      { label: "Quick Start", slug: "quick-start" },
      { label: "Core Concepts", slug: "core-concepts" },
    ],
  },
  {
    title: "Agents",
    icon: FiCpu,
    items: [
      { label: "Overview", slug: "agent-overview" },
      { label: "Creating Agents", slug: "creating-agents" },
      { label: "Agent Configuration", slug: "agent-configuration" },
      { label: "Default Pipeline", slug: "default-pipeline" },
    ],
  },
  {
    title: "Pipelines",
    icon: FiGitBranch,
    items: [
      { label: "Visual Editor", slug: "visual-editor" },
      { label: "Node Types", slug: "node-types" },
      { label: "Execution Flow", slug: "execution-flow" },
    ],
  },
  {
    title: "Skills",
    icon: FiLayers,
    items: [
      { label: "Built-in Skills", slug: "built-in-skills" },
      { label: "Custom Skills", slug: "custom-skills" },
    ],
  },
  {
    title: "Sessions",
    icon: FiTerminal,
    items: [
      { label: "Session Manager", slug: "session-manager" },
      { label: "Local Sessions", slug: "local-sessions" },
      { label: "Cloud Sessions", slug: "cloud-sessions" },
      { label: "Git Worktrees", slug: "git-worktrees" },
      { label: "Code Editor", slug: "code-editor" },
      { label: "Integrated Browser", slug: "integrated-browser" },
      { label: "Terminal", slug: "terminal" },
    ],
  },
  {
    title: "App Interface",
    icon: FiLayout,
    items: [
      { label: "Layout Overview", slug: "layout-overview" },
      { label: "Sidebar Tools", slug: "sidebar-tools" },
      { label: "Tab Management", slug: "tab-management" },
      { label: "Popout Windows", slug: "popout-windows" },
    ],
  },
  {
    title: "Configuration",
    icon: FiSettings,
    items: [
      { label: "Presets", slug: "presets" },
      { label: "Autonomy Levels", slug: "autonomy-levels" },
      { label: "Model Settings", slug: "model-settings" },
    ],
  },
];

const allSlugs = sidebarData.flatMap((s) => s.items.map((i) => i.slug));

function sectionKey(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

const sectionByKey = Object.fromEntries(
  sidebarData.map((s) => [sectionKey(s.title), s])
);

function findSectionKey(slug: string): string {
  for (const s of sidebarData) {
    if (s.items.some((i) => i.slug === slug)) return sectionKey(s.title);
  }
  return "getting-started";
}

function resolveSlugFromParams(params: URLSearchParams): string {
  for (const [key, value] of params.entries()) {
    if (key === "section") continue;
    const sec = sectionByKey[key];
    if (sec && sec.items.some((i) => i.slug === value)) return value;
  }
  return "introduction";
}

function findSection(slug: string): string {
  for (const s of sidebarData) {
    if (s.items.some((i) => i.slug === slug)) return s.title;
  }
  return "Docs";
}

function findLabel(slug: string): string {
  for (const s of sidebarData) {
    const item = s.items.find((i) => i.slug === slug);
    if (item) return item.label;
  }
  return slug;
}

function getNav(slug: string) {
  const idx = allSlugs.indexOf(slug);
  return {
    prev: idx > 0 ? { label: findLabel(allSlugs[idx - 1]), slug: allSlugs[idx - 1] } : undefined,
    next: idx < allSlugs.length - 1 ? { label: findLabel(allSlugs[idx + 1]), slug: allSlugs[idx + 1] } : undefined,
  };
}

const pageData: Record<string, Omit<PageContent, "prev" | "next">> = {

  introduction: {
    title: "Introduction",
    subtitle: "Welcome to Rune — the multi-agent orchestration framework.",
    section: "Getting Started",
    toc: [
      { label: "What is Rune?", id: "what-is-rune", depth: 0 },
      { label: "Why multi-agent?", id: "why-multi-agent", depth: 0 },
      { label: "Key features", id: "key-features", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="what-is-rune">What is Rune?</SectionHeading>
        <P>Rune is a desktop framework for building, running, and managing multi-agent AI workflows. Define agents through skill files, connect them in visual pipelines, and execute tasks in isolated sessions — all from an Electron-based interface with a built-in code editor and terminal.</P>
        <P>Unlike single-agent tools, Rune lets you compose specialized agents into pipelines where each agent handles one part of the task. A planning agent can analyze the codebase, an implementation agent can write the code, and a review agent can validate the output — or you can create entirely different agent types for your specific workflows.</P>

        <SectionHeading id="why-multi-agent">Why multi-agent?</SectionHeading>
        <P>Single-agent approaches hit a ceiling on complex tasks. Agents that try to plan, implement, and review simultaneously produce lower quality output. Splitting responsibilities across specialized agents with focused skill instructions produces better results — each agent has a clear scope, a smaller context window, and domain-specific instructions.</P>
        <P>Multi-agent pipelines also give you more control. You can assign different models to different agents, set different autonomy levels, and review the output at each stage rather than only at the end.</P>

        <SectionHeading id="key-features">Key features</SectionHeading>
        <VStack align="stretch" spacing={3} mb={4}>
          <FeatureCard icon={FiCpu} title="Custom Agents" desc="Define any type of agent through markdown skill files with YAML configuration. Planning agents, code writers, reviewers, security auditors, doc generators — any role you need." />
          <FeatureCard icon={FiGitBranch} title="Visual Pipelines" desc="Drag-and-drop pipeline editor for designing agent workflows. Sequential chains, parallel branches, conditional routing, and feedback loops." />
          <FeatureCard icon={FiTerminal} title="Isolated Sessions" desc="Every task runs in its own git worktree with a dedicated branch. Full transcript persistence, concurrent sessions, and merge-when-ready workflow." />
          <FeatureCard icon={FiLayers} title="Built-in Editor" desc="Monaco-based code editor with file browser, integrated terminal, and real-time agent activity. See exactly what agents are doing as they work." />
        </VStack>
      </>
    ),
  },

  installation: {
    title: "Installation",
    subtitle: "Get Rune running on your machine.",
    section: "Getting Started",
    toc: [
      { label: "Requirements", id: "install-reqs", depth: 0 },
      { label: "Download", id: "install-download", depth: 0 },
      { label: "API key setup", id: "install-api", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="install-reqs">Requirements</SectionHeading>
        <P>Rune runs on macOS, Windows, and Linux. You'll need Git installed (for worktree-based session isolation) and an API key from a supported LLM provider.</P>

        <SectionHeading id="install-download">Download</SectionHeading>
        <P>Download the latest release from the Rune website or GitHub releases page. On macOS, drag to Applications. On Windows, run the installer. On Linux, use the AppImage or .deb package.</P>
        <CodeBlock language="bash">{`# macOS (Homebrew)
brew install --cask rune

# Linux (apt)
sudo dpkg -i rune-latest.deb`}</CodeBlock>

        <SectionHeading id="install-api">API key setup</SectionHeading>
        <P>Open Rune, go to Settings → API Keys, and add your provider key. Claude is recommended as the default — the built-in skill templates are optimized for it — but any supported provider works.</P>
        <Callout title="First time?" icon={FiInfo}>Once your key is set, open a project folder and try the Quick Start to run your first session.</Callout>
      </>
    ),
  },

  "quick-start": {
    title: "Quick Start",
    subtitle: "Run your first multi-agent session in under two minutes.",
    section: "Getting Started",
    toc: [
      { label: "Open a project", id: "qs-project", depth: 0 },
      { label: "Describe your task", id: "qs-task", depth: 0 },
      { label: "Choose a preset", id: "qs-preset", depth: 0 },
      { label: "Run and review", id: "qs-run", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="qs-project">1. Open a project</SectionHeading>
        <P>Launch Rune and open a Git repository. Rune needs a git repo because sessions use worktrees for isolation. If your project isn't a git repo yet, Rune will offer to initialize one.</P>

        <SectionHeading id="qs-task">2. Describe your task</SectionHeading>
        <P>Type a task description in the input field on the home view. Be as specific as you'd be with a colleague: what you want done, any constraints, and which files or areas of the codebase are involved.</P>

        <SectionHeading id="qs-preset">3. Choose a preset</SectionHeading>
        <P>Select a preset from the configuration panel. Start with <InlineCode>Balanced</InlineCode> — it runs a planning agent, an implementation agent, and one review cycle. You can adjust this later.</P>

        <SectionHeading id="qs-run">4. Run and review</SectionHeading>
        <P>Click Start. Rune creates a session with its own branch and worktree, then runs your pipeline. Watch the transcript in real time — each agent's messages, thinking, and tool calls appear as they happen. When it's done, review the diff and merge if you're happy with the result.</P>
      </>
    ),
  },

  "core-concepts": {
    title: "Core Concepts",
    subtitle: "The building blocks of Rune.",
    section: "Getting Started",
    toc: [
      { label: "Agents", id: "cc-agents", depth: 0 },
      { label: "Skills", id: "cc-skills", depth: 0 },
      { label: "Pipelines", id: "cc-pipelines", depth: 0 },
      { label: "Sessions", id: "cc-sessions", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="cc-agents">Agents</SectionHeading>
        <P>An agent is an AI unit that performs a specific role. Agents are defined by their skill files — markdown documents with YAML frontmatter that specify the agent's instructions, model, tools, and behavior. You can create agents for any purpose: planning, implementation, review, testing, documentation, security analysis, or anything else.</P>

        <SectionHeading id="cc-skills">Skills</SectionHeading>
        <P>Skills are the definition files for agents. Each skill is a markdown file with a YAML header that specifies configuration (model, tools, autonomy) and a body that contains the agent's instructions. Skills live in your project's <InlineCode>.rune/skills/</InlineCode> directory and are version-controlled with your code.</P>

        <SectionHeading id="cc-pipelines">Pipelines</SectionHeading>
        <P>A pipeline defines how agents connect and in what order they execute. The visual editor lets you build pipelines by dragging agent nodes onto a canvas and connecting them with edges. Pipelines support sequential flows, parallel branches, conditional routing, and feedback loops.</P>

        <SectionHeading id="cc-sessions">Sessions</SectionHeading>
        <P>A session is one execution of a pipeline against a task. Each session gets its own git branch and worktree, ensuring complete isolation. Sessions persist their full transcript and can be paused, resumed, and reviewed at any time.</P>
      </>
    ),
  },

  "agent-overview": {
    title: "Agent Overview",
    subtitle: "What agents are and how they work in Rune.",
    section: "Agents",
    toc: [
      { label: "What is an agent?", id: "ao-what", depth: 0 },
      { label: "Agent capabilities", id: "ao-caps", depth: 0 },
      { label: "Execution model", id: "ao-exec", depth: 0 },
      { label: "Visibility", id: "ao-visibility", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ao-what">What is an agent?</SectionHeading>
        <P>An agent in Rune is a specialized AI unit defined by a skill file. Each agent has a focused role — planning, implementing, reviewing, testing, documenting, auditing — whatever you define. Agents receive context from the pipeline (the task description, previous agent outputs, file contents) and produce output that gets passed to the next stage.</P>
        <P>Agents aren't hardcoded types. You create them by writing skill files that describe what the agent should do, what tools it has access to, and how it should behave. Rune ships with a default set of agents, but you're expected to create your own for your specific workflows.</P>

        <SectionHeading id="ao-caps">Agent capabilities</SectionHeading>
        <P>Depending on their tool access, agents can read and write files, run terminal commands, search codebases, browse documentation, and interact with any tool available in the session environment. Tool access is configured per agent in the skill file — a planning agent might only have read access, while an implementation agent has full write access.</P>

        <SectionHeading id="ao-exec">Execution model</SectionHeading>
        <P>When a pipeline triggers an agent, Rune constructs a prompt from the agent's skill instructions plus the pipeline context (task, previous outputs, relevant files). The agent runs against its configured model, makes tool calls as needed, and produces output. That output becomes context for the next agent in the pipeline.</P>

        <SectionHeading id="ao-visibility">Visibility</SectionHeading>
        <P>Everything an agent does is visible in the session transcript: messages, thinking blocks, tool calls, file changes, terminal commands, and errors. You can watch agents work in real time or review the full transcript after completion. Each agent's activity is grouped under a collapsible phase header.</P>
      </>
    ),
  },

  "creating-agents": {
    title: "Creating Agents",
    subtitle: "Define new agent types through skill files.",
    section: "Agents",
    toc: [
      { label: "Skill file structure", id: "ca-structure", depth: 0 },
      { label: "Example agents", id: "ca-examples", depth: 0 },
      { label: "Agent instructions", id: "ca-instructions", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ca-structure">Skill file structure</SectionHeading>
        <P>Every agent is defined by a skill file — a markdown document in <InlineCode>.rune/skills/</InlineCode> with YAML frontmatter for configuration and a body for instructions.</P>
        <CodeBlock language="yaml">{`---
name: Planning Agent
role: planner
model: claude-sonnet-4
tools:
  - file_read
  - file_search
  - terminal_read
autonomy: auto
---

# Planning Agent

You are a planning agent. Your job is to analyze the codebase,
understand the task requirements, and produce a detailed
implementation plan.

## Responsibilities
- Read relevant files and understand the codebase structure
- Identify which files need to be created or modified
- Break the task into clear, ordered steps
- Flag any risks, edge cases, or decisions that need input`}</CodeBlock>

        <SectionHeading id="ca-examples">Example agents</SectionHeading>
        <P>You can create any type of agent. Here are some common patterns:</P>
        <VStack align="stretch" spacing={3} mb={4}>
          <FeatureCard icon={FiSearch} title="Planning Agent" desc="Reads the codebase, asks clarifying questions, produces an implementation plan. Tools: file_read, file_search, terminal_read." />
          <FeatureCard icon={FiTerminal} title="Implementation Agent" desc="Takes a plan and writes the code. Tools: file_read, file_write, file_search, terminal." />
          <FeatureCard icon={FiShield} title="Review Agent" desc="Evaluates implementation against the plan and coding standards. Produces feedback or approval. Tools: file_read, file_search." />
          <FeatureCard icon={FiAlertCircle} title="Security Auditor" desc="Scans for vulnerabilities, insecure patterns, and dependency issues. Tools: file_read, file_search, terminal." />
          <FeatureCard icon={FiBook} title="Documentation Agent" desc="Generates or updates docs, READMEs, and inline comments based on code changes. Tools: file_read, file_write." />
        </VStack>

        <SectionHeading id="ca-instructions">Agent instructions</SectionHeading>
        <P>The markdown body of the skill file is the agent's system prompt. Write it like you're onboarding a new team member — explain the role, responsibilities, output format, and any rules. Be specific about what the agent should and shouldn't do. The more focused and clear the instructions, the better the agent performs.</P>
      </>
    ),
  },

  "agent-configuration": {
    title: "Agent Configuration",
    subtitle: "Per-agent model, tools, and behavior settings.",
    section: "Agents",
    toc: [
      { label: "Model selection", id: "ac-model", depth: 0 },
      { label: "Tool access", id: "ac-tools", depth: 0 },
      { label: "Autonomy overrides", id: "ac-autonomy", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ac-model">Model selection</SectionHeading>
        <P>Each agent can use a different model. Set this in the skill file's YAML frontmatter or override it in the pipeline editor. Use a faster, cheaper model for agents that mostly read (planning, review) and a more capable model for agents that write complex code.</P>
        <CodeBlock language="yaml">{`# In the skill file
model: claude-sonnet-4

# Or override per-pipeline in the editor UI`}</CodeBlock>

        <SectionHeading id="ac-tools">Tool access</SectionHeading>
        <P>Control exactly which tools each agent can use. A planning agent might only need <InlineCode>file_read</InlineCode> and <InlineCode>file_search</InlineCode>, while an implementation agent needs <InlineCode>file_write</InlineCode> and <InlineCode>terminal</InlineCode> too. Restricting tools prevents agents from taking actions outside their role.</P>
        <CodeBlock language="yaml">{`tools:
  - file_read       # Read file contents
  - file_write      # Create/modify files
  - file_search     # Search codebase
  - terminal        # Run commands (full access)
  - terminal_read   # Run commands (read-only)`}</CodeBlock>

        <SectionHeading id="ac-autonomy">Autonomy overrides</SectionHeading>
        <P>Override the pipeline's default autonomy level for individual agents. A common setup: let planning and review agents run on auto (they only read), but keep the implementation agent on balanced so it pauses before making big decisions.</P>
      </>
    ),
  },

  "default-pipeline": {
    title: "Default Pipeline",
    subtitle: "The built-in plan → implement → review workflow.",
    section: "Agents",
    toc: [
      { label: "Overview", id: "dp-overview", depth: 0 },
      { label: "How it works", id: "dp-how", depth: 0 },
      { label: "Customizing the default", id: "dp-customize", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="dp-overview">Overview</SectionHeading>
        <P>Rune ships with a default pipeline that demonstrates the multi-agent pattern: a planning agent analyzes the task, an implementation agent writes the code, and a review agent validates the output. This is one example of how agents can work together — not the only way to use Rune.</P>

        <SectionHeading id="dp-how">How it works</SectionHeading>
        <P>The default flow runs in three stages:</P>
        <CodeBlock language="text">{`Planning Agent → Implementation Agent → Review Agent
     │                    │                   │
     │ Reads codebase,    │ Takes the plan,   │ Reads the diff,
     │ asks questions,    │ writes code,      │ checks quality,
     │ produces plan      │ runs tests        │ approves or sends
     │                    │                   │ feedback for
     │                    │                   │ another iteration`}</CodeBlock>
        <P>If the review agent sends feedback rather than approving, the implementation agent runs again with the feedback as additional context. This loop continues until the review agent approves or the maximum iteration count is reached (configurable via presets).</P>

        <SectionHeading id="dp-customize">Customizing the default</SectionHeading>
        <P>The default pipeline is a starting point. Open it in the pipeline editor to modify the flow — add new agent nodes, change the connections, add parallel branches, or remove stages you don't need. You can also save modified versions as new named pipelines.</P>
      </>
    ),
  },

  "visual-editor": {
    title: "Visual Editor",
    subtitle: "Build agent pipelines with drag-and-drop.",
    section: "Pipelines",
    toc: [
      { label: "Canvas overview", id: "ve-canvas", depth: 0 },
      { label: "Adding agents", id: "ve-adding", depth: 0 },
      { label: "Connecting nodes", id: "ve-connecting", depth: 0 },
      { label: "Saving pipelines", id: "ve-saving", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ve-canvas">Canvas overview</SectionHeading>
        <P>The pipeline editor is a node-based canvas where you design agent workflows visually. Each agent appears as a node that you can position, connect, and configure. The canvas supports zoom, pan, and grid snapping.</P>

        <SectionHeading id="ve-adding">Adding agents</SectionHeading>
        <P>Drag agents from the toolbar onto the canvas, or right-click to add from the context menu. Each node represents one agent execution — select a node to configure its skill, model, autonomy, and tool access in the properties panel.</P>

        <SectionHeading id="ve-connecting">Connecting nodes</SectionHeading>
        <P>Draw edges between nodes to define execution order. The output of one agent becomes context for the next. You can create branching paths (parallel execution), merge points (wait for all branches), and feedback loops (send output back to a previous agent).</P>

        <SectionHeading id="ve-saving">Saving pipelines</SectionHeading>
        <P>Pipelines are saved at the project level in <InlineCode>.rune/pipelines/</InlineCode> and version-controlled with your code. Name them descriptively — you'll select pipelines by name when starting sessions.</P>
      </>
    ),
  },

  "node-types": {
    title: "Node Types",
    subtitle: "The building blocks of pipeline graphs.",
    section: "Pipelines",
    toc: [
      { label: "Agent nodes", id: "nt-agent", depth: 0 },
      { label: "Control nodes", id: "nt-control", depth: 0 },
      { label: "I/O nodes", id: "nt-io", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="nt-agent">Agent nodes</SectionHeading>
        <P>The primary node type. Each agent node runs one agent with its configured skill, model, and tools. Configure it by selecting a skill from the dropdown in the properties panel. Agent nodes have one input port (receives context) and one output port (passes results forward).</P>

        <SectionHeading id="nt-control">Control nodes</SectionHeading>
        <VStack align="stretch" spacing={3} mb={4}>
          <FeatureCard icon={FiGitBranch} title="Branch" desc="Splits execution into parallel paths. All branches run concurrently — useful for running independent agents simultaneously." />
          <FeatureCard icon={FiLayers} title="Merge" desc="Waits for all incoming branches to complete, then combines their outputs as context for the next node." />
          <FeatureCard icon={FiSliders} title="Conditional" desc="Routes execution to different branches based on the previous agent's output. Define conditions in the node properties." />
          <FeatureCard icon={FiPlay} title="Loop" desc="Sends output back to a previous node for iterative refinement. Configure a max iteration count and exit condition." />
        </VStack>

        <SectionHeading id="nt-io">I/O nodes</SectionHeading>
        <P>Start and End nodes mark the pipeline boundaries. The Start node receives the task description and initial context. The End node marks completion and makes the session results available for review.</P>
      </>
    ),
  },

  "execution-flow": {
    title: "Execution Flow",
    subtitle: "How pipelines run at session time.",
    section: "Pipelines",
    toc: [
      { label: "Sequential execution", id: "ef-seq", depth: 0 },
      { label: "Parallel branches", id: "ef-parallel", depth: 0 },
      { label: "Feedback loops", id: "ef-loops", depth: 0 },
      { label: "Error handling", id: "ef-errors", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ef-seq">Sequential execution</SectionHeading>
        <P>The simplest flow: agents run one after another. Each agent receives the task description plus all previous agents' outputs as context. This is how the default plan → implement → review pipeline works.</P>

        <SectionHeading id="ef-parallel">Parallel branches</SectionHeading>
        <P>Branch nodes split execution so multiple agents run concurrently. A merge node collects all branch outputs before continuing. Useful for running independent tasks simultaneously — e.g., a frontend agent and a backend agent working on different parts of the same feature.</P>

        <SectionHeading id="ef-loops">Feedback loops</SectionHeading>
        <P>Loop edges send an agent's output back to a previous agent for iterative refinement. The review-implementation loop in the default pipeline is one example: the review agent either approves (exiting the loop) or provides feedback (triggering another implementation pass). Configure max iterations to prevent infinite loops.</P>

        <SectionHeading id="ef-errors">Error handling</SectionHeading>
        <P>If an agent hits an error (API failure, tool error, rate limit), Rune pauses the session and shows the error in the transcript. You can retry the failed agent, skip it, or abort the session. Automatic retry with exponential backoff is available for transient API errors.</P>
      </>
    ),
  },

  "built-in-skills": {
    title: "Built-in Skills",
    subtitle: "The skill files that ship with Rune.",
    section: "Skills",
    toc: [
      { label: "Default skills", id: "bis-default", depth: 0 },
      { label: "Skill locations", id: "bis-location", depth: 0 },
      { label: "Overriding built-ins", id: "bis-override", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="bis-default">Default skills</SectionHeading>
        <P>Rune ships with a set of built-in skills that cover the most common agent roles. These are used by the default pipeline and serve as examples for creating your own.</P>
        <VStack align="stretch" spacing={3} mb={4}>
          <FeatureCard icon={FiSearch} title="Planning Skill" desc="Analyzes the codebase, asks clarifying questions, and produces a structured implementation plan. Read-only tool access." />
          <FeatureCard icon={FiTerminal} title="Implementation Skill" desc="Takes a plan and implements it — writing code, running tests, and iterating on errors. Full tool access." />
          <FeatureCard icon={FiShield} title="Review Skill" desc="Evaluates code changes against the plan and coding standards. Produces approval or actionable feedback for another iteration." />
          <FeatureCard icon={FiCpu} title="Frontend Skill" desc="Specialized for frontend work — component creation, styling, accessibility, and browser APIs." />
          <FeatureCard icon={FiLayers} title="Backend Skill" desc="Specialized for backend work — APIs, database operations, authentication, and server-side logic." />
          <FeatureCard icon={FiAlertCircle} title="Security Skill" desc="Scans for common vulnerabilities, insecure patterns, and dependency issues." />
        </VStack>

        <SectionHeading id="bis-location">Skill locations</SectionHeading>
        <P>Built-in skills are bundled with Rune and loaded from the application directory. When you initialize a project with Rune, copies are placed in <InlineCode>.rune/skills/</InlineCode> so you can read and modify them.</P>

        <SectionHeading id="bis-override">Overriding built-ins</SectionHeading>
        <P>Edit any built-in skill in your project's <InlineCode>.rune/skills/</InlineCode> directory to customize it. Your local version takes precedence over the bundled version. This lets you tune the default agents for your codebase and coding style without starting from scratch.</P>
      </>
    ),
  },

  "custom-skills": {
    title: "Custom Skills",
    subtitle: "Create your own agent types from scratch.",
    section: "Skills",
    toc: [
      { label: "Creating a skill", id: "cs-creating", depth: 0 },
      { label: "YAML configuration", id: "cs-yaml", depth: 0 },
      { label: "Writing instructions", id: "cs-writing", depth: 0 },
      { label: "Testing skills", id: "cs-testing", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="cs-creating">Creating a skill</SectionHeading>
        <P>Create a new <InlineCode>.md</InlineCode> file in <InlineCode>.rune/skills/</InlineCode>. The file name becomes the skill identifier. Add YAML frontmatter for configuration and markdown body for instructions.</P>
        <CodeBlock language="bash">{`# Create a new skill
touch .rune/skills/test-writer.md`}</CodeBlock>

        <SectionHeading id="cs-yaml">YAML configuration</SectionHeading>
        <P>The frontmatter defines the agent's technical configuration:</P>
        <CodeBlock language="yaml">{`---
name: Test Writer
role: tester
model: claude-sonnet-4
tools:
  - file_read
  - file_write
  - file_search
  - terminal
autonomy: balanced
---`}</CodeBlock>

        <SectionHeading id="cs-writing">Writing instructions</SectionHeading>
        <P>The markdown body is the agent's system prompt. Structure it with clear sections: role description, responsibilities, output format, rules, and examples. Think of it as onboarding documentation for the agent.</P>
        <CodeBlock language="markdown">{`# Test Writer

You are a test-writing agent. Given code changes, you write
comprehensive tests that cover the new functionality.

## Responsibilities
- Read the implementation diff to understand what changed
- Write unit tests for all new functions and methods
- Write integration tests for new API endpoints
- Ensure edge cases are covered
- Run the test suite and fix any failures

## Rules
- Use the project's existing test framework and patterns
- One test file per source file modified
- Include both positive and negative test cases`}</CodeBlock>

        <SectionHeading id="cs-testing">Testing skills</SectionHeading>
        <P>Test a new skill by creating a simple pipeline with just that agent and running a session. Review the transcript to see how the agent interprets its instructions, then iterate on the skill file until the behavior matches what you want.</P>
      </>
    ),
  },

  "session-manager": {
    title: "Session Manager",
    subtitle: "How Rune organizes and tracks your work.",
    section: "Sessions",
    toc: [
      { label: "What is a session?", id: "sm-what", depth: 0 },
      { label: "Session lifecycle", id: "sm-lifecycle", depth: 0 },
      { label: "Persistence", id: "sm-persistence", depth: 0 },
      { label: "Concurrent sessions", id: "sm-concurrent", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="sm-what">What is a session?</SectionHeading>
        <P>A session is a single execution of a task through a pipeline. When you start a session, Rune creates an isolated environment — its own git branch, worktree, and transcript — then runs your chosen pipeline against the task you described.</P>
        <P>Sessions capture everything: every agent message, thinking block, tool call, file change, and terminal command. The full transcript is persisted and can be reviewed at any time.</P>

        <SectionHeading id="sm-lifecycle">Session lifecycle</SectionHeading>
        <CodeBlock language="text">{`Created → Running → Completed
                    ↓
                  Paused (waiting for input or error recovery)
                    ↓
                  Resumed → Running → Completed`}</CodeBlock>
        <P>You can pause a running session, close the app, and resume later — the session picks up exactly where it left off.</P>

        <SectionHeading id="sm-persistence">Persistence</SectionHeading>
        <P>Sessions persist across app restarts. The session list on the home view shows all sessions with their status, pipeline, branch name, and last activity. Click any session to reopen its full transcript and file changes.</P>

        <SectionHeading id="sm-concurrent">Concurrent sessions</SectionHeading>
        <P>Multiple sessions can run simultaneously without interfering with each other. Each session operates in its own git worktree on its own branch, so file changes in one session never conflict with another.</P>
      </>
    ),
  },

  "local-sessions": {
    title: "Local Sessions",
    subtitle: "Sessions that run on your machine.",
    section: "Sessions",
    toc: [
      { label: "How local sessions work", id: "ls-how", depth: 0 },
      { label: "Resource usage", id: "ls-resources", depth: 0 },
      { label: "When to use local", id: "ls-when", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ls-how">How local sessions work</SectionHeading>
        <P>Local sessions run entirely on your machine. Agents execute against your local file system, use your local git installation, and run terminal commands in your local environment. API calls to your configured LLM provider are the only network traffic.</P>
        <P>This means agents have access to your full development environment — installed tools, local servers, environment variables, and everything else available in your terminal.</P>

        <SectionHeading id="ls-resources">Resource usage</SectionHeading>
        <P>Local sessions are lightweight. The primary resource cost is API usage to your LLM provider. File operations, git commands, and terminal execution use minimal system resources. Running multiple concurrent sessions increases API usage but has negligible local performance impact.</P>

        <SectionHeading id="ls-when">When to use local</SectionHeading>
        <P>Local sessions are ideal when you need access to your local development environment, want to test against local services, or prefer to keep everything on your machine. They're the default session type and work out of the box with no additional configuration.</P>
      </>
    ),
  },

  "cloud-sessions": {
    title: "Cloud Sessions",
    subtitle: "Run sessions on remote infrastructure.",
    section: "Sessions",
    toc: [
      { label: "Overview", id: "cs-overview", depth: 0 },
      { label: "How it will work", id: "cs-how", depth: 0 },
      { label: "Use cases", id: "cs-usecases", depth: 0 },
    ],
    content: (
      <>
        <Callout title="Coming Soon" icon={FiCloud}>Cloud sessions are under active development and will be available in a future release.</Callout>

        <SectionHeading id="cs-overview">Overview</SectionHeading>
        <P>Cloud sessions will run agent pipelines on remote infrastructure instead of your local machine. Your project is synced to a cloud environment where agents execute with dedicated compute resources, and results are synced back when complete.</P>

        <SectionHeading id="cs-how">How it will work</SectionHeading>
        <P>Cloud sessions will use the same pipeline and agent configuration as local sessions — the only difference is where execution happens. Start a session, choose cloud as the target, and Rune handles the rest. The session transcript streams back in real time.</P>

        <SectionHeading id="cs-usecases">Use cases</SectionHeading>
        <P>Cloud sessions will be useful for long-running tasks that benefit from dedicated resources, teams that want to run pipelines without tying up local machines, and CI/CD-style workflows where sessions are triggered automatically.</P>
      </>
    ),
  },

  "git-worktrees": {
    title: "Git Worktrees",
    subtitle: "How Rune isolates sessions using git.",
    section: "Sessions",
    toc: [
      { label: "What are worktrees?", id: "gw-what", depth: 0 },
      { label: "Session isolation", id: "gw-isolation", depth: 0 },
      { label: "Merging changes", id: "gw-merging", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="gw-what">What are worktrees?</SectionHeading>
        <P>Git worktrees let you check out multiple branches of the same repository simultaneously, each in its own directory. Rune uses this feature to give every session its own isolated copy of your project on a dedicated branch.</P>

        <SectionHeading id="gw-isolation">Session isolation</SectionHeading>
        <P>When a session starts, Rune creates a new branch and worktree automatically. Agents read and write files within this worktree — they can't affect your working directory or other sessions.</P>
        <CodeBlock language="text">{`your-project/
├── (your working directory — untouched)
├── .rune/worktrees/
│   ├── session-abc/   ← branch: rune/session-abc
│   └── session-xyz/   ← branch: rune/session-xyz`}</CodeBlock>

        <SectionHeading id="gw-merging">Merging changes</SectionHeading>
        <P>When you're satisfied with a session's output, merge its branch from the session header. Rune shows a diff summary before merging so you can review exactly what will change. If there are conflicts, they're handled through your normal git workflow.</P>
      </>
    ),
  },

  "code-editor": {
    title: "Code Editor",
    subtitle: "A full VS Code-based editor built into every session.",
    section: "Sessions",
    toc: [
      { label: "Overview", id: "ce-overview", depth: 0 },
      { label: "VS Code foundation", id: "ce-vscode", depth: 0 },
      { label: "File browser", id: "ce-files", depth: 0 },
      { label: "Live agent changes", id: "ce-live", depth: 0 },
      { label: "Editing alongside agents", id: "ce-editing", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ce-overview">Overview</SectionHeading>
        <P>Every session includes a built-in code editor so you can read, navigate, and edit files without leaving Rune. The editor is powered by VS Code's core — the same Monaco engine, syntax highlighting, keybindings, and language intelligence you're already used to.</P>

        <SectionHeading id="ce-vscode">VS Code foundation</SectionHeading>
        <P>The editor supports the full range of VS Code editing features: multi-cursor editing, find and replace, code folding, bracket matching, minimap navigation, and syntax highlighting for all major languages. It uses the same keybindings as VS Code by default, so the muscle memory you already have carries over directly.</P>
        <P>Extensions and themes aren't currently supported — the editor focuses on fast, lightweight code editing within the session context rather than being a full IDE replacement.</P>

        <SectionHeading id="ce-files">File browser</SectionHeading>
        <P>A file browser panel shows the full directory tree of the session's worktree. Click any file to open it in the editor. The file browser updates in real time as agents create, modify, or delete files — you can watch the project structure evolve as agents work.</P>

        <SectionHeading id="ce-live">Live agent changes</SectionHeading>
        <P>When an agent modifies a file that's currently open in the editor, the changes appear in real time. You can see exactly what the agent is writing as it writes it. Modified files are marked in the file browser so you can quickly see what's been touched.</P>

        <SectionHeading id="ce-editing">Editing alongside agents</SectionHeading>
        <P>You can edit files manually at any time — even while agents are running. Since the editor operates on the same worktree, your changes are immediately visible to agents on their next file read. This is useful for quick fixes, adding context comments, or steering the direction of agent output mid-session.</P>
      </>
    ),
  },

  "integrated-browser": {
    title: "Integrated Browser",
    subtitle: "Preview web output directly inside Rune.",
    section: "Sessions",
    toc: [
      { label: "Overview", id: "ib-overview", depth: 0 },
      { label: "Live preview", id: "ib-preview", depth: 0 },
      { label: "Agent browser access", id: "ib-agent", depth: 0 },
      { label: "DevTools", id: "ib-devtools", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ib-overview">Overview</SectionHeading>
        <P>Rune includes an integrated browser panel within the session view. Instead of switching to an external browser to check agent output, you can preview web pages, local dev servers, and rendered HTML directly inside the app.</P>

        <SectionHeading id="ib-preview">Live preview</SectionHeading>
        <P>Point the browser at your local dev server to see changes as agents make them. When an agent modifies a component or page, the browser reflects the update — useful for visually verifying frontend work without context-switching. You can navigate, interact with the page, and test user flows all within the session.</P>

        <SectionHeading id="ib-agent">Agent browser access</SectionHeading>
        <P>Agents with browser tool access can interact with the integrated browser directly — navigating to URLs, reading page content, taking screenshots, and verifying that their changes render correctly. This gives agents a feedback loop for visual work: write code, check the browser, iterate.</P>

        <SectionHeading id="ib-devtools">DevTools</SectionHeading>
        <P>The integrated browser includes developer tools for inspecting elements, checking console output, monitoring network requests, and debugging JavaScript. Agents can also read console errors to diagnose and fix rendering issues as part of their workflow.</P>
      </>
    ),
  },

  terminal: {
    title: "Integrated Terminal",
    subtitle: "Full terminal access within the session view.",
    section: "Sessions",
    toc: [
      { label: "Terminal access", id: "t-access", depth: 0 },
      { label: "Agent terminal usage", id: "t-agent", depth: 0 },
      { label: "Manual commands", id: "t-manual", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="t-access">Terminal access</SectionHeading>
        <P>Every session includes an integrated terminal scoped to the session's worktree. Open it from the session view to run commands directly in the session's isolated environment — the same environment agents use.</P>

        <SectionHeading id="t-agent">Agent terminal usage</SectionHeading>
        <P>When agents run terminal commands (installing dependencies, running tests, starting dev servers), the commands and their output appear in the session transcript as tool cards. You can see exactly what was executed and what the output was.</P>

        <SectionHeading id="t-manual">Manual commands</SectionHeading>
        <P>You can run your own commands in the session terminal at any time — even while agents are working. This is useful for testing changes, checking build output, or running commands agents didn't think to run.</P>
      </>
    ),
  },

  "layout-overview": {
    title: "Layout Overview",
    subtitle: "How the Rune interface is organized and how to make it your own.",
    section: "App Interface",
    toc: [
      { label: "Interface anatomy", id: "lo-anatomy", depth: 0 },
      { label: "Main areas", id: "lo-areas", depth: 0 },
      { label: "Resizing panels", id: "lo-resizing", depth: 0 },
      { label: "Layout persistence", id: "lo-persistence", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="lo-anatomy">Interface anatomy</SectionHeading>
        <P>The Rune interface is split into two main regions. The left side is the primary workspace — your session transcript, pipeline editor, or home view depending on what you're doing. The right side is a tool sidebar that houses the code editor, integrated browser, database viewer, and terminal. These two regions work together so you can watch agents work on the left while browsing code or previewing output on the right.</P>

        <SectionHeading id="lo-areas">Main areas</SectionHeading>
        <VStack align="stretch" spacing={3} mb={4}>
          <FeatureCard icon={FiColumns} title="Tool Sidebar" desc="The right panel containing your development tools — code editor, browser, database, and terminal. Organized into tabs that can be rearranged, split into columns, or popped out into separate windows." />
          <FeatureCard icon={FiMonitor} title="Main View" desc="The left panel showing your current context — session transcript with agent activity, pipeline editor canvas, or the home view with session list and task input." />
          <FeatureCard icon={FiMove} title="Resize Handle" desc="A draggable divider between the main view and tool sidebar. Drag it left or right to adjust how much space each region gets. Your preference is saved automatically." />
        </VStack>

        <SectionHeading id="lo-resizing">Resizing panels</SectionHeading>
        <P>Grab the vertical divider between the main view and the tool sidebar to resize them. Drag it left to give more room to the sidebar tools, or right to expand the main view. When the sidebar has multiple columns, each column can also be resized individually by dragging the dividers between them.</P>

        <SectionHeading id="lo-persistence">Layout persistence</SectionHeading>
        <P>Rune remembers your layout preferences — sidebar width, column arrangement, active tabs, and popout window positions are all saved automatically and restored when you reopen the app. If you ever want to start fresh, you can reset the layout from the settings menu.</P>
      </>
    ),
  },

  "sidebar-tools": {
    title: "Sidebar Tools",
    subtitle: "The four built-in tools in the right sidebar and how to use them.",
    section: "App Interface",
    toc: [
      { label: "Web browser", id: "st-web", depth: 0 },
      { label: "Code editor", id: "st-code", depth: 0 },
      { label: "Database viewer", id: "st-database", depth: 0 },
      { label: "Terminal", id: "st-terminal", depth: 0 },
      { label: "Switching between tools", id: "st-switching", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="st-web">Web browser</SectionHeading>
        <P>The integrated browser lets you preview web output, visit documentation, and test local dev servers without leaving Rune. It supports multiple tabs with favicon display, a URL bar with back/forward/refresh controls, and bookmarks for pages you visit often. The browser loads your default help page on first open and supports full navigation to any URL.</P>

        <SectionHeading id="st-code">Code editor</SectionHeading>
        <P>A full VS Code-based editor powered by code-server. It gives you syntax highlighting, IntelliSense, file browsing, multi-cursor editing, and all the core VS Code features — running directly in the sidebar. When agents modify files, you see changes in real time. Open files, search across the project, and make manual edits alongside agent activity.</P>

        <SectionHeading id="st-database">Database viewer</SectionHeading>
        <P>The database panel provides a visual interface for inspecting and querying databases connected to your project. Browse tables, run queries, and view results without switching to a separate database tool.</P>

        <SectionHeading id="st-terminal">Terminal</SectionHeading>
        <P>A full terminal emulator scoped to the current session's worktree. Run any command you'd run in your normal terminal — install dependencies, run tests, start dev servers, or check git status. The terminal operates in the same environment agents use, so you can verify and interact with their work directly.</P>

        <SectionHeading id="st-switching">Switching between tools</SectionHeading>
        <P>Click any tab in the sidebar tab bar to switch between tools. The tab bar sits at the top of each sidebar pane, showing icons and labels for each available tool. Only the active tool is visible, but previously opened tools stay mounted in the background so their state is preserved — switch away from the terminal and back, and your session is exactly where you left it.</P>
      </>
    ),
  },

  "tab-management": {
    title: "Tab Management",
    subtitle: "Rearrange, split, and organize your sidebar tools.",
    section: "App Interface",
    toc: [
      { label: "Drag to reorder", id: "tm-reorder", depth: 0 },
      { label: "Split into columns", id: "tm-split", depth: 0 },
      { label: "Combine panes", id: "tm-combine", depth: 0 },
      { label: "Drop zones", id: "tm-zones", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="tm-reorder">Drag to reorder</SectionHeading>
        <P>Tabs within a pane can be reordered by dragging. Click and hold any tab label, then drag it left or right within the same tab bar to change its position. Release to drop it in the new spot. This is useful for putting your most-used tools first.</P>

        <SectionHeading id="tm-split">Split into columns</SectionHeading>
        <P>To view two tools side by side, drag a tab toward the left or right edge of the sidebar. When you see the edge highlight indicator appear, release the tab to split the sidebar into two columns. Each column operates independently with its own tab bar and active tool. You can split further to create three or more columns if you need them.</P>
        <Callout title="Tip" icon={FiInfo}>Splitting the browser and code editor into side-by-side columns is a common setup for frontend work — preview your app in the browser while editing code right next to it.</Callout>

        <SectionHeading id="tm-combine">Combine panes</SectionHeading>
        <P>To merge two panes back together, drag a tab from one pane and drop it onto another pane's tab bar. The tab joins that pane and its original pane collapses if it was the last tab. This is how you consolidate columns back into a single pane when you no longer need the split view.</P>

        <SectionHeading id="tm-zones">Drop zones</SectionHeading>
        <P>When dragging a tab, visual indicators show where you can drop it. Edge indicators appear at the left and right borders for splitting into columns, and the destination pane highlights when you hover over another pane's tab area for combining. A window-shaped preview follows your cursor during the drag to show what you're moving.</P>
      </>
    ),
  },

  "popout-windows": {
    title: "Popout Windows",
    subtitle: "Detach tools into their own floating windows.",
    section: "App Interface",
    toc: [
      { label: "Popping out a tab", id: "pw-popout", depth: 0 },
      { label: "Working with popouts", id: "pw-working", depth: 0 },
      { label: "Docking back", id: "pw-docking", depth: 0 },
      { label: "Popout persistence", id: "pw-persistence", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="pw-popout">Popping out a tab</SectionHeading>
        <P>Any sidebar tool can be detached into its own standalone window. Drag a tab outside the sidebar area — past the edges of the main window — and release it. The tool opens in a new frameless window positioned where you dropped it. This is especially useful for putting the browser or terminal on a second monitor while keeping the main Rune window focused on the session transcript and code editor.</P>

        <SectionHeading id="pw-working">Working with popouts</SectionHeading>
        <P>Popout windows behave like independent windows — resize them, move them around, and arrange them however you like. Each popout has a minimal titlebar showing the tool name and icon, plus a dock-back button to return the tool to the sidebar. The popout runs the same tool instance, so all your state (open browser tabs, terminal history, editor files) carries over.</P>

        <SectionHeading id="pw-docking">Docking back</SectionHeading>
        <P>To return a popped-out tool to the sidebar, click the arrow button in the popout window's titlebar. The popout window closes and the tool reappears in the sidebar exactly where it was before. You can also close the popout window directly — the tool returns to the sidebar automatically.</P>

        <SectionHeading id="pw-persistence">Popout persistence</SectionHeading>
        <P>Popout window positions and sizes are saved automatically. When you restart Rune, any tools that were in popout windows reopen in the same positions. This means you can set up your multi-monitor layout once and have it restored every time you open the app.</P>
      </>
    ),
  },

  presets: {
    title: "Presets",
    subtitle: "Pre-configured pipeline settings for different workflows.",
    section: "Configuration",
    toc: [
      { label: "What are presets?", id: "p-what", depth: 0 },
      { label: "Available presets", id: "p-available", depth: 0 },
      { label: "Custom presets", id: "p-custom", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="p-what">What are presets?</SectionHeading>
        <P>Presets are pre-configured combinations of pipeline settings that optimize for different workflows. Instead of manually adjusting planning mode, review iterations, and autonomy level for each session, select a preset that matches how you want to work.</P>

        <SectionHeading id="p-available">Available presets</SectionHeading>
        <VStack align="stretch" spacing={3} mb={4}>
          <FeatureCard icon={FiZap} title="Fast" desc="Minimal planning, single implementation pass, no review loop. Best for quick fixes and small changes where speed matters most." />
          <FeatureCard icon={FiSliders} title="Balanced" desc="Standard planning with targeted questions, one review cycle, balanced autonomy. The default for most tasks." />
          <FeatureCard icon={FiShield} title="Quality" desc="Thorough planning with deep codebase exploration, multiple review iterations, detailed feedback loops. Best for complex features and production-critical code." />
          <FeatureCard icon={FiCpu} title="Thorough" desc="Maximum exploration, extended review cycles, and comprehensive validation. For large-scale changes that need careful attention to every detail." />
        </VStack>

        <SectionHeading id="p-custom">Custom presets</SectionHeading>
        <P>Create your own presets by combining any pipeline settings. Save them as named configurations and select them when starting a session.</P>
        <CodeBlock language="yaml">{`# Example custom preset
name: security-focused
planning:
  mode: thorough
review:
  mode: auto
  maxIterations: 3
skills:
  pinned:
    - security
    - backend`}</CodeBlock>
      </>
    ),
  },

  "autonomy-levels": {
    title: "Autonomy Levels",
    subtitle: "Control how much oversight agents require.",
    section: "Configuration",
    toc: [
      { label: "Overview", id: "al-overview", depth: 0 },
      { label: "Supervised", id: "al-supervised", depth: 0 },
      { label: "Balanced", id: "al-balanced", depth: 0 },
      { label: "Auto", id: "al-auto", depth: 0 },
      { label: "Per-agent overrides", id: "al-overrides", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="al-overview">Overview</SectionHeading>
        <P>Autonomy determines when agents pause for your input versus when they proceed on their own. Set it at the pipeline level as a default, then override per agent if needed.</P>

        <SectionHeading id="al-supervised">Supervised</SectionHeading>
        <P>Agents pause before every significant action — writing files, running commands, making decisions. You approve each step before it executes. Best for learning how agents work or for high-stakes changes.</P>

        <SectionHeading id="al-balanced">Balanced</SectionHeading>
        <P>Agents work freely on routine operations (reading files, searching code, running tests) but pause for significant decisions — creating new files, making architectural choices, or running destructive commands. The default for most workflows.</P>

        <SectionHeading id="al-auto">Auto</SectionHeading>
        <P>Agents run the entire pipeline end-to-end without interruption. They make all decisions independently based on their skill instructions. Best for well-defined tasks with pipelines you trust.</P>

        <SectionHeading id="al-overrides">Per-agent overrides</SectionHeading>
        <P>Override the pipeline default for individual agents. A common pattern: set the planning agent to auto (it only reads), the implementation agent to balanced (it writes code), and the review agent to auto (it only evaluates).</P>
        <CodeBlock language="yaml">{`# Pipeline-level default
autonomy: balanced

# Per-agent overrides in the pipeline editor
# Planning agent → auto (reads only)
# Implementation agent → balanced (writes code)
# Review agent → auto (evaluates only)`}</CodeBlock>
      </>
    ),
  },

  "model-settings": {
    title: "Model Settings",
    subtitle: "Configure LLM providers and per-agent model assignments.",
    section: "Configuration",
    toc: [
      { label: "Provider setup", id: "ms-providers", depth: 0 },
      { label: "Per-agent models", id: "ms-per-agent", depth: 0 },
      { label: "Cost optimization", id: "ms-cost", depth: 0 },
    ],
    content: (
      <>
        <SectionHeading id="ms-providers">Provider setup</SectionHeading>
        <P>Configure your LLM providers in Settings → Model Settings. Add your API key, select a default model, and optionally configure fallback providers. Rune supports Claude (via the Agent SDK or direct API), OpenAI, and custom providers through the LLM abstraction layer.</P>
        <Callout title="Note" icon={FiBook}>Claude is the recommended default. The built-in skills and pipeline behaviors are optimized for Claude's capabilities, but any supported provider will work.</Callout>

        <SectionHeading id="ms-per-agent">Per-agent models</SectionHeading>
        <P>Assign different models to different agents in the pipeline editor. Click an agent node and select its model from the configuration panel. This lets you optimize cost and performance.</P>
        <CodeBlock language="yaml">{`# Example: different models per agent
planning-agent:
  model: claude-3-5-haiku    # fast, cheap — mostly reads files
implementation-agent:
  model: claude-sonnet-4     # capable — writes code
review-agent:
  model: claude-sonnet-4     # needs judgment for quality eval`}</CodeBlock>

        <SectionHeading id="ms-cost">Cost optimization</SectionHeading>
        <P>The biggest lever for cost is model selection per agent. Planning agents that primarily search and read files don't need the most capable model. Review agents that make judgment calls benefit from higher capability. Presets also affect cost — the "fast" preset uses significantly fewer tokens than "thorough".</P>
      </>
    ),
  },
};

const pages: Record<string, PageContent> = {};
for (const [slug, data] of Object.entries(pageData)) {
  pages[slug] = { ...data, ...getNav(slug) };
}

function SidebarSectionComponent({
  section, activeSlug, onSelect, searchQuery,
}: {
  section: SidebarSection;
  activeSlug: string;
  onSelect: (slug: string) => void;
  searchQuery: string;
}) {
  const isActiveSection = section.items.some((i) => i.slug === activeSlug);
  const [isOpen, setIsOpen] = useState(true);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return section.items;
    return section.items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [section.items, searchQuery]);

  if (searchQuery && filteredItems.length === 0) return null;

  return (
    <Box>
      <Flex
        align="center" justify="space-between" py={2} px={3}
        cursor="pointer" borderRadius="8px" transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.04)" }}
        onClick={() => setIsOpen(!isOpen)} role="group"
      >
        <HStack spacing={2.5}>
          <Icon as={section.icon} boxSize={3.5}
            color={isActiveSection ? "gray.300" : "gray.500"}
            _groupHover={{ color: "gray.300" }} transition="color 0.2s" />
          <Text fontSize="sm" fontWeight={600}
            color={isActiveSection ? "gray.200" : "gray.300"}
            letterSpacing="-0.01em">
            {section.title}
          </Text>
        </HStack>
        <Icon as={isOpen ? FiChevronDown : FiChevronRight} boxSize={3} color="gray.600" />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="stretch" spacing={0} pl={3} mt={0.5}>
          {filteredItems.map((item) => (
            <Flex key={item.slug} align="center" py={1.5} px={3} ml={3}
              cursor="pointer" borderRadius="8px" borderLeft="2px solid"
              borderColor={activeSlug === item.slug ? "gray.400" : "rgba(255,255,255,0.04)"}
              bg={activeSlug === item.slug ? "rgba(255,255,255,0.06)" : "transparent"}
              transition="all 0.2s"
              _hover={{
                bg: activeSlug === item.slug ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                borderColor: activeSlug === item.slug ? "gray.400" : "rgba(255,255,255,0.1)",
              }}
              onClick={() => onSelect(item.slug)}>
              <Text fontSize="sm"
                color={activeSlug === item.slug ? "gray.50" : "gray.400"}
                fontWeight={activeSlug === item.slug ? 500 : 400}
                transition="color 0.2s">
                {item.label}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
}

function DocsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSlug = resolveSlugFromParams(searchParams);
  const initialSection = searchParams.get("section") || "";

  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTocId, setActiveTocId] = useState(initialSection);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (initialSection) {
      const el = document.getElementById(initialSection);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, []);

  const currentPage = pages[activeSlug] || null;

  const handleSelect = useCallback((slug: string, section?: string) => {
    setActiveSlug(slug);
    setSidebarOpen(false);
    setActiveTocId(section || "");

    const params = new URLSearchParams();
    params.set(findSectionKey(slug), slug);
    if (section) params.set("section", section);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [router, pathname]);

  return (
    <Box minH="100vh" bg="#171717" overflowX="hidden">
      <Box position="fixed" top={0} left={0} right={0} w="100%" zIndex={1000}
        bg="rgba(23,23,23,0.8)" backdropFilter="blur(20px)"
        sx={{ WebkitBackdropFilter: "blur(20px)" }}
        borderBottom="1px solid" borderColor="rgba(255,255,255,0.06)">
        <Flex maxW="1400px" mx="auto" px={{ base: 4, md: 6 }} py={3}
          align="center" justify="space-between">
          <HStack spacing={6}>
            <Link href="/" passHref>
              <HStack spacing={2.5} cursor="pointer">
                <Image src="/rune-logo.webp" alt="Rune" h="28px" w="auto" />
              </HStack>
            </Link>
            <Box w="1px" h="20px" bg="rgba(255,255,255,0.08)" display={{ base: "none", md: "block" }} />
            <Text fontSize="sm" fontWeight={500} color="gray.400" display={{ base: "none", md: "block" }}>
              Documentation
            </Text>
          </HStack>
          <HStack spacing={4}>
            <ChakraLink href="/" fontSize="sm" fontWeight={500} color="gray.500"
              _hover={{ color: "gray.50", textDecoration: "none" }}
              transition="all 0.2s" display={{ base: "none", md: "flex" }}>
              Home
            </ChakraLink>
            <Link href="/download" passHref>
              <Button size="sm" bg="#e6e6e6" color="#171717" fontWeight={500}
                fontSize="sm" borderRadius="full" px={4}
                _hover={{ bg: "#d4d4d4" }} _active={{ bg: "#c2c2c2" }}
                transition="all 0.2s">
                Download
              </Button>
            </Link>
            <Box display={{ base: "flex", lg: "none" }} cursor="pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)} p={1}>
              <Icon as={sidebarOpen ? FiX : FiMenu} boxSize={5} color="gray.400" />
            </Box>
          </HStack>
        </Flex>
      </Box>
      <Flex maxW="1400px" mx="auto" pt="60px" minH="100vh">
        <Box as="aside" w="260px" flexShrink={0} position="fixed"
          top="60px" bottom={0}
          left={{ base: sidebarOpen ? 0 : "-100%", lg: "auto" }}
          overflowY="auto" borderRight="1px solid"
          borderColor="rgba(255,255,255,0.06)" bg="#171717"
          zIndex={999} transition="left 0.3s ease" px={3} py={5}
          sx={{
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": { bg: "transparent" },
            "&::-webkit-scrollbar-thumb": { bg: "rgba(255,255,255,0.08)", borderRadius: "full" },
          }}>
          <Box px={1} mb={5}>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none" h="36px">
                <Icon as={FiSearch} boxSize={3.5} color="gray.500" />
              </InputLeftElement>
              <Input placeholder="Search docs..." bg="rgba(255,255,255,0.04)"
                border="1px solid" borderColor="rgba(255,255,255,0.06)"
                borderRadius="10px" h="36px" fontSize="sm" color="gray.50"
                _placeholder={{ color: "gray.500" }}
                _hover={{ borderColor: "rgba(255,255,255,0.1)" }}
                _focus={{ borderColor: "rgba(255,255,255,0.2)", boxShadow: "0 0 0 1px rgba(255,255,255,0.1)", bg: "rgba(255,255,255,0.06)" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
            </InputGroup>
          </Box>
          <VStack align="stretch" spacing={2}>
            {sidebarData.map((section) => (
              <SidebarSectionComponent key={section.title} section={section}
                activeSlug={activeSlug} onSelect={handleSelect} searchQuery={searchQuery} />
            ))}
          </VStack>
        </Box>
        {sidebarOpen && (
          <Box display={{ base: "block", lg: "none" }} position="fixed" inset={0}
            bg="rgba(0,0,0,0.5)" zIndex={998} onClick={() => setSidebarOpen(false)} />
        )}
        <Box flex={1} ml={{ base: 0, lg: "260px" }} mr={{ base: 0, xl: "220px" }}
          px={{ base: 5, md: 10 }} py={{ base: 8, md: 12 }} maxW="800px">
          {currentPage ? (
            <>
              <HStack spacing={2} mb={8}>
                <Text fontSize="xs" color="gray.500">Docs</Text>
                <Text fontSize="xs" color="gray.600">/</Text>
                <Text fontSize="xs" color="gray.500">{currentPage.section}</Text>
                <Text fontSize="xs" color="gray.600">/</Text>
                <Text fontSize="xs" color="gray.50" fontWeight={500}>{currentPage.title}</Text>
              </HStack>
              <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight={700}
                letterSpacing="-0.02em" lineHeight={1.2} color="gray.50" mb={3}>
                {currentPage.title}
              </Heading>
              <Text fontSize="md" color="gray.400" lineHeight={1.8} mb={10}>
                {currentPage.subtitle}
              </Text>
              <Box>{currentPage.content}</Box>
              <Flex borderTop="1px solid" borderColor="rgba(255,255,255,0.06)"
                pt={6} mt={12} justify="space-between">
                {currentPage.prev ? (
                  <Flex align="center" gap={2} cursor="pointer" color="gray.400"
                    transition="color 0.2s" _hover={{ color: "gray.50" }}
                    onClick={() => handleSelect(currentPage.prev!.slug)}>
                    <Icon as={FiChevronLeft} boxSize={3.5} />
                    <Text fontSize="sm" fontWeight={500}>{currentPage.prev.label}</Text>
                  </Flex>
                ) : <Box />}
                {currentPage.next ? (
                  <Flex align="center" gap={2} cursor="pointer" color="gray.400"
                    transition="color 0.2s" _hover={{ color: "gray.50" }}
                    onClick={() => handleSelect(currentPage.next!.slug)}>
                    <Text fontSize="sm" fontWeight={500}>{currentPage.next.label}</Text>
                    <Icon as={FiChevronRight} boxSize={3.5} />
                  </Flex>
                ) : <Box />}
              </Flex>
            </>
          ) : (
            <VStack align="stretch" spacing={4} py={4}>
              {[1, 2, 3].map((i) => (
                <Box key={i} h={i === 1 ? "32px" : "80px"} w={i === 1 ? "60%" : "100%"}
                  bg="rgba(255,255,255,0.04)" borderRadius="8px" />
              ))}
            </VStack>
          )}
        </Box>
        <Box as="aside" w="220px" flexShrink={0} position="fixed"
          top="60px" right={{ base: "-100%", xl: "auto" }} bottom={0}
          py={10} pr={6} display={{ base: "none", xl: "block" }} overflowY="auto">
          {currentPage && currentPage.toc.length > 0 && (
            <>
              <Text fontSize="xs" fontWeight={600} color="gray.400"
                textTransform="uppercase" letterSpacing="0.08em" mb={4}>
                On This Page
              </Text>
              <VStack align="stretch" spacing={0}>
                {currentPage.toc.map((item) => (
                  <Box key={item.id} as="a" href={`?${findSectionKey(activeSlug)}=${activeSlug}&section=${item.id}#${item.id}`} py={1.5}
                    pl={item.depth === 1 ? 4 : 0} borderLeft="2px solid"
                    borderColor={activeTocId === item.id ? "gray.400" : "rgba(255,255,255,0.04)"}
                    cursor="pointer" transition="all 0.2s"
                    _hover={{ borderColor: activeTocId === item.id ? "gray.400" : "rgba(255,255,255,0.1)" }}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      setActiveTocId(item.id);
                      const params = new URLSearchParams();
                      params.set(findSectionKey(activeSlug), activeSlug);
                      params.set("section", item.id);
                      router.push(`${pathname}?${params.toString()}`, { scroll: false });
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}>
                    <Text fontSize="xs"
                      color={activeTocId === item.id ? "gray.50" : "gray.500"}
                      fontWeight={activeTocId === item.id ? 500 : 400}
                      pl={3} transition="color 0.2s"
                      _hover={{ color: activeTocId === item.id ? "gray.50" : "gray.300" }}>
                      {item.label}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default function DocsPage() {
  return (
    <Suspense fallback={
      <Box minH="100vh" bg="#171717" />
    }>
      <DocsPageInner />
    </Suspense>
  );
}
