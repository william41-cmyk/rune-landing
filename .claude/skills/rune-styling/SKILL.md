---
name: rune-styling
description: Styling reference for the Rune site. Use when creating new components, sections, or UI elements to ensure visual consistency.
---

# Rune Site — Styling Reference

Use this skill whenever creating new components, sections, or UI elements for the Rune site. Follow every pattern documented below to ensure visual consistency.

## Tech Stack

- **Framework:** Next.js 15 (App Router, `"use client"` components)
- **UI Library:** Chakra UI v2.10.7 (`@chakra-ui/react`) — all layout/styling via Chakra props, NO Tailwind, NO CSS files
- **CSS-in-JS:** Emotion (`@emotion/react`, `@emotion/styled`) via Chakra's `CacheProvider`
- **Animation:** Framer Motion v11.18.2 (`motion.create()` pattern for Chakra components)
- **Icons:** `react-icons/fi` (Feather icons), `react-icons/hi2` (Heroicons v2 — used for `HiOutlineCommandLine` in Navbar)
- **Fonts:** Geist Sans + Geist Mono via `geist/font/sans` and `geist/font/mono` (CSS variables `--font-geist-sans`, `--font-geist-mono`)
- **WebGL:** OGL v1.0.11 (for `DarkVeil` shader backgrounds)

---

## Theme (`src/theme/index.ts`)

### Color Mode
- Dark mode only: `initialColorMode: "dark"`, `useSystemColorMode: false`

### Fonts
```
heading: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
body:    var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
mono:    var(--font-geist-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace
```

### Font Sizes (custom scale)
| Token  | px   | Usage                              |
|--------|------|------------------------------------|
| `2xs`  | 11px | pill text, platform labels, stat timestamps |
| `xs`   | 12px | copyright, mono node labels, tool names, field labels |
| `sm`   | 13px | footer links, small UI text, card descriptions, agent names |
| `md`   | 14px | buttons, nav links, card body, card titles |
| `lg`   | 15px | descriptions, detail text          |
| `xl`   | 16px | card titles, body text (mobile)    |
| `2xl`  | 18px | logo, mode descriptions            |
| `3xl`  | 20px | subheadings, body text (desktop)   |
| `3.5xl`| 22px | medium subheadings, description text (desktop) |
| `4xl`  | 32px | section headings (mobile)          |
| `5xl`  | 36px | CTA heading (mobile), subpage headings (mobile) |
| `6xl`  | 44px | hero heading (mobile)              |
| `7xl`  | 48px | section headings (desktop), subpage headings (desktop) |
| `8xl`  | 55px | hero heading (desktop), countdown digits (desktop) |
| `9xl`  | 56px | CTA heading (desktop)              |
| `10xl` | 64px | hero heading (tablet)              |

### Gray Palette
```
gray.50:  #e6e6e6   (primary text, CTA button bg)
gray.100: #e5e5e5
gray.200: #d4d4d4   (button hover states)
gray.300: #a3a3a3   (gradient text endpoint)
gray.400: #737373   (nav links, descriptions, footer links)
gray.500: #525252   (subtle text, disabled nav items, footer labels, platform labels)
gray.600: #404040   (disabled text like "Source", copyright)
gray.700: #333333
gray.800: #262626
gray.900: #1c1c1c   (elevated surfaces, tooltip bg)
gray.950: #0d0d0d
```

### Brand Colors
```
brand.bg:           #171717  (page background — THE primary bg everywhere)
brand.surface:      #161616  (card/panel backgrounds)
brand.surfaceLight: #1c1c1c  (elevated panels)
```

### Rune Design Tokens (used in card visuals & inner UI)

These tokens are defined inline in `FeaturesCarouselSection.tsx` and represent the full design system for inner card content:

```ts
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
    reading:  { color: "#8ab4f8", accent: "#bfdbfe" },
    writing:  { color: "#fb923c", accent: "#fdba74" },
    editing:  { color: "#f472b6", accent: "#f9a8d4" },
    running:  { color: "#34d399", accent: "#6ee7b7" },
    analyzing:{ color: "#f97316", accent: "#fb923c" },
    reviewing:{ color: "#c084fc", accent: "#d8b4fe" },
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
};
```

### Selection Color
```css
::selection { bg: rgba(168, 85, 247, 0.3); color: white; }
```

### Button Base Style (theme component)
```ts
Button: {
  baseStyle: {
    fontWeight: 600,
    borderRadius: "12px",
    transition: "all 0.2s ease",
  },
},
```

---

## Providers & Layout Setup

### Root Layout (`src/app/layout.tsx`)
- Geist fonts loaded via `geist/font/sans` and `geist/font/mono`
- CSS variables applied on `<html>` via `className={GeistSans.variable} ${GeistMono.variable}`
- Includes structured JSON-LD for schema.org
- Wraps children with `<Providers>`

### Providers (`src/app/providers.tsx`)
```tsx
<CacheProvider>
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
</CacheProvider>
```

---

## Global Layout Patterns

### Page Container (Home)
```tsx
<Box as="main" minH="100vh" bg="#171717" overflowX="hidden">
  <Box
    maxW="1200px"
    mx="auto"
    position="relative"
    borderLeft="1px dashed"
    borderRight="1px dashed"
    borderColor="rgba(255,255,255,0.12)"
  >
    {/* Navbar, sections, Footer */}
  </Box>
</Box>
```

### Page Container (Subpages — Download, $RUNE)
```tsx
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
    {/* content */}
    <Box mt="auto"><Footer /></Box>
  </Box>
</Box>
```

Note: Home page uses `borderColor="rgba(255,255,255,0.12)"`, subpages use `rgba(255,255,255,0.08)`.

### Section Container (inner content)
```tsx
maxW="1100px"  // content narrower than outer 1200px container
mx="auto"
px={{ base: 5, md: 8 }}
py={{ base: 20, md: 32 }}  // generous vertical padding
```

---

## Navbar (`src/components/Navbar.tsx`)

```tsx
<Box
  position="fixed"
  top={0} left={0} right={0}
  w="100%"
  zIndex={1000}
  backdropFilter={scrolled ? "blur(20px)" : "none"}
  borderBottom="1px dashed"
  borderColor={scrolled ? "rgba(255,255,255,0.12)" : "transparent"}
  transition="all 0.3s ease"
  sx={{ WebkitBackdropFilter: scrolled ? "blur(20px)" : "none" }}
>
  <Flex maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} py={4} align="center" justify="space-between">
```

- Logo: `<Image src="/rune-logo.webp" h="32px" w="auto" />`
- Nav links: `fontSize="md"`, `fontWeight={500}`, `color="gray.400"`, hover `color="gray.50"`
- Disabled nav text: `color="gray.600"`, `cursor="not-allowed"`
- CTA button: `size="sm"`, `bg="#e6e6e6"`, `color="#171717"`, `fontSize="sm"`, `borderRadius="full"`, `px={4}`
- Scroll detection via `useScroll()` + `useMotionValueEvent` (triggers at `scrollY > 20`)

---

## Common Component Patterns

### Primary Button (light on dark)
```tsx
<Button
  bg="#e6e6e6"
  color="#171717"
  fontWeight={500}
  fontSize="md"
  borderRadius="full"
  px={5}
  h="40px"
  leftIcon={<FiDownload size={14} />}
  _hover={{ bg: "#d4d4d4" }}
  _active={{ bg: "#c2c2c2" }}
  transition="all 0.2s"
>
  Download Now
</Button>
```

### Disabled Button (with tooltip)
```tsx
<Button
  bg="#e6e6e6"
  color="#171717"
  fontWeight={500}
  fontSize="md"
  borderRadius="full"
  px={5}
  h="40px"
  isDisabled
  _disabled={{
    bg: "rgba(255,255,255,0.08)",
    color: "gray.500",
    cursor: "not-allowed",
    opacity: 1,
  }}
/>
```

### Tooltip
```tsx
<Tooltip
  label={text}
  fontFamily="mono"
  fontSize="xs"
  bg="gray.900"
  color="gray.50"
  border="1px solid"
  borderColor="rgba(255,255,255,0.08)"
  borderRadius="8px"
  px={3}
  py={1.5}
  hasArrow
  placement="bottom"
/>
```

### Section Heading
```tsx
<Heading
  fontSize={{ base: "3xl", md: "3.5xl" }}
  letterSpacing="-0.02em"
  lineHeight={1.3}
  color="gray.50"
>
```

### Hero/CTA Large Heading (gradient text — solid color)
```tsx
<Heading
  as="h1"
  fontSize={{ base: "6xl", md: "7xl", lg: "8xl" }}
  fontWeight={700}
  lineHeight={1.05}
  letterSpacing="-0.03em"
  sx={{
    background: "#e6e6e6",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
```

### Subpage Heading (gradient from light to mid)
```tsx
<Heading
  fontSize={{ base: "5xl", md: "7xl" }}
  fontWeight={700}
  lineHeight={1.1}
  letterSpacing="-0.03em"
  sx={{
    background: "linear-gradient(180deg, #f5f5f5 0%, #a3a3a3 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
```

### Description Text (VideoSection — large)
```tsx
<Text
  fontSize={{ base: "md", md: "3.5xl" }}
  color="gray.400"
  lineHeight={1.3}
  textAlign="center"
  maxW="680px"
>
```

### Description Text (cards, smaller contexts)
```tsx
<Text fontSize="sm" color="gray.400" lineHeight={1.6}>
```

### Back Navigation Link (subpages)
```tsx
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
```

---

## Border & Surface Patterns

### Dashed Borders (structural lines)
```
borderLeft="1px dashed"   borderColor="rgba(255,255,255,0.12)"  // page container (home)
borderLeft="1px dashed"   borderColor="rgba(255,255,255,0.08)"  // page container (subpages)
borderBottom="1px dashed"  borderColor="rgba(255,255,255,0.12)"  // navbar on scroll
borderTop="1px dashed"    borderColor="rgba(255,255,255,0.12)"  // footer
```

### Solid Borders (cards, panels)
```
border="1px solid"  borderColor="rgba(255,255,255,0.08)"   // standard cards, video placeholder
border="1px solid"  borderColor="rgba(255,255,255,0.06)"   // subtle (tab container, window chrome bar)
```

### Surface Backgrounds (overlay opacity hierarchy)
```
rgba(255,255,255,0.02)  — barely visible (sidebar bg, inner ring)
rgba(255,255,255,0.03)  — pill containers, subtle panels, window chrome bar, dot grid
rgba(255,255,255,0.04)  — feature card bg, inactive icon buttons, hover inactive tabs
rgba(255,255,255,0.05)  — active preset row, code block bg, expanded diff bg (rune.overlay.soft)
rgba(255,255,255,0.06)  — skeleton active bars, window chrome borders
rgba(255,255,255,0.08)  — active list items, hover states, selected options (rune.overlay.hover)
rgba(255,255,255,0.1)   — glass icon background, active tab bg
rgba(255,255,255,0.12)  — active option in segmented control (rune.overlay.strong)
rgba(255,255,255,0.15)  — decorative dots
```

### Gradient Fades (section transitions)
```tsx
// Bottom fade into next section (hero)
<Box
  position="absolute" bottom={0} left={0} right={0}
  h="120px"
  bg="linear-gradient(to bottom, transparent, #171717)"
  zIndex={2}
  pointerEvents="none"
/>

// Top fade from previous section (CTA)
<Box
  position="absolute" top={0} left={0} right={0}
  h="300px"
  bg="linear-gradient(to bottom, #171717, transparent)"
  zIndex={1}
  pointerEvents="none"
/>

// Bottom fade (subpages, taller)
<Box
  position="absolute" bottom={0} left={0} right={0}
  h="200px"
  bg="linear-gradient(to bottom, transparent, #171717)"
  zIndex={1}
  pointerEvents="none"
/>
```

### Right/Left Edge Fades (carousels)
```tsx
// Right edge
<Box
  position="absolute" top={0} right={0} bottom={0}
  w={{ base: "80px", md: "160px" }}
  pointerEvents="none"
  bg={`linear-gradient(to right, transparent, ${rune.bg.secondary})`}
  zIndex={2}
/>

// Left edge (appears on scroll)
<Box
  position="absolute" top={0} left={0} bottom={0}
  w={{ base: "40px", md: "80px" }}
  pointerEvents="none"
  bg={`linear-gradient(to left, transparent, ${rune.bg.secondary})`}
  zIndex={2}
  opacity={scrollIndex > 0 ? 1 : 0}
  transition="opacity 0.4s ease"
/>
```

---

## Glass Morphism Pattern

### Glass Icon (40x40)
```tsx
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
  <Icon as={SomeIcon} boxSize="18px" color="white" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))" />
</Box>
```

### Frosted Navbar (on scroll)
```tsx
backdropFilter="blur(20px)"
sx={{ WebkitBackdropFilter: "blur(20px)" }}
```

---

## Card Patterns

### Feature Card (carousel)
```tsx
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
```

Card internal layout:
- Header: `px={5} pt={5} pb={0}` — GlassIcon + title + chevron button
- Description: `px={5} pt={3} pb={0}`
- Visual area: `flex={1} px={4} pt={5} pb={5} display="flex" flexDirection="column"`

Card chevron button (top-right):
```tsx
<Flex
  w="28px" h="28px"
  borderRadius="full"
  bg="rgba(255,255,255,0.04)"
  border="1px solid rgba(255,255,255,0.08)"
  align="center" justify="center"
  transition="all 0.2s"
  _groupHover={{ bg: "rgba(255,255,255,0.08)", color: "gray.100" }}
>
  <Icon as={FiChevronRight} boxSize={3.5} color="gray.400" />
</Flex>
```

### Pill / Tab Switcher
```tsx
<Flex
  bg="rgba(255,255,255,0.03)"
  border="1px solid"
  borderColor="rgba(255,255,255,0.06)"
  borderRadius="full"
  p={1}
>
  {tabs.map((tab, i) => (
    <Flex
      px={{ base: 4, md: 5 }}
      py={2}
      borderRadius="full"
      cursor="pointer"
      transition="all 0.25s ease"
      bg={active === i ? "rgba(255,255,255,0.1)" : "transparent"}
      _hover={{ bg: active === i ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)" }}
    >
      <Text
        fontSize="sm"
        fontWeight={active === i ? 600 : 400}
        color={active === i ? "gray.50" : "gray.500"}
        transition="color 0.25s ease"
        whiteSpace="nowrap"
      />
    </Flex>
  ))}
</Flex>
```

### Segmented Control (inside cards)
```tsx
<HStack spacing={0} bg={rune.overlay.soft} p="2px" borderRadius="lg" flex={1}>
  {options.map((opt) => (
    <Box
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
```

### Icon Button (arrows, controls)
```tsx
<IconButton
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
  isDisabled={disabled}
  opacity={disabled ? 0.35 : 1}
/>
```

---

## Inner Card Visual Patterns

### List Row with Dividers
```tsx
<HStack
  py={2}
  px={1}
  spacing={3}
  borderBottom="1px solid"
  borderColor={rune.overlay.grid}  // rgba(255,255,255,0.04)
>
  <Icon as={icon} boxSize="12px" color={rune.text.placeholder} />
  <Text fontSize="xs" color={rune.text.subtle} minW="72px">{label}</Text>
  <Text fontSize="xs" fontFamily="mono" color={rune.text.secondary} flex={1} noOfLines={1}>{value}</Text>
  <Icon as={FiChevronDown} boxSize="10px" color={rune.text.placeholder} />
</HStack>
```

### Active/Inactive Row Selection
```tsx
<Box
  py={2.5}
  px={3}
  borderRadius="lg"
  bg={active ? rune.overlay.soft : "transparent"}
>
```

### Radio-Style Dot
```tsx
// Active
<Box w="8px" h="8px" borderRadius="full" border="2px solid" borderColor={rune.text.primary}>
  <Box w="100%" h="100%" borderRadius="full" bg={rune.text.primary} />
</Box>

// Inactive
<Box w="8px" h="8px" borderRadius="full" border="1.5px solid" borderColor={rune.text.placeholder} />
```

### Status Dot
```tsx
<Box w="5px" h="5px" borderRadius="full" bg={statusColor} />
```

### Running Indicator (pulsing dot)
```tsx
<Box w="5px" h="5px" borderRadius="full" bg="#fcd34d" sx={{ animation: "pulse 1.4s ease-in-out infinite" }} />
```

### Tool Card Row (collapsed)
```tsx
<HStack spacing={0} py={1.5} px={2} borderRadius="md">
  <Icon as={FiChevronRight} boxSize={3} color={rune.text.placeholder} mr={2} />
  <ActivityIconMini type="reading" size={14} />
  <Text fontFamily="mono" fontSize="xs" color={rune.tool.read} fontWeight="semibold" ml={2}>Read</Text>
  <Text fontFamily="mono" fontSize="xs" color={rune.text.muted} ml={2} flex={1} noOfLines={1}>path</Text>
  <Text fontFamily="mono" fontSize="2xs" color={rune.text.subtle} ml={2}>0.2s</Text>
</HStack>
```

### Expanded Code Block (diff style)
```tsx
<Box ml={7} mr={1} mb={1} py={2} px={2.5} borderRadius="md" bg={rune.overlay.soft} fontFamily="mono" fontSize="2xs" lineHeight={1.9}>
  <Text color={rune.diff.add.color}><Text as="span" color={rune.text.placeholder}>+</Text> code line</Text>
</Box>
```

### Code Block (framework/syntax display)
```tsx
<Box
  fontFamily="mono"
  fontSize="xs"
  lineHeight={2}
  bg={rune.overlay.soft}
  borderRadius="md"
  py={3}
  px={3}
>
  <Text><Text as="span" color={rune.accent.purple}>import</Text> ...</Text>
</Box>
```

### Agent Node (gradient ring logo)
```tsx
<svg width="28" height="28" viewBox="0 0 28 28">
  <defs>
    <linearGradient id="ag-id" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#3b82f6" />
      <stop offset="100%" stopColor="#06b6d4" />
    </linearGradient>
  </defs>
  <circle cx="14" cy="14" r="9" fill="none" stroke="url(#ag-id)" strokeWidth="4.5" />
</svg>
```

Mini version (12x12): `r="3.5"`, `strokeWidth="2.5"`

### Dashed Grid Background (canvas visual)
```tsx
<svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
  <defs>
    <pattern id="grid" x="0" y="0" width="50" height="12" patternUnits="userSpaceOnUse">
      <line x1="0.5" y1="0" x2="0.5" y2="12" stroke={rune.overlay.grid} strokeWidth="2" strokeDasharray="6 6" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
```

### Pipeline Node Box (canvas card)
```tsx
<Box bg={rune.overlay.soft} borderRadius="xl" w="100%" position="relative">
  <HStack px={3} py={2.5} spacing={3} align="center">
    {/* Agent gradient ring SVG */}
    <Box>
      <Text fontSize="sm" fontWeight="semibold" color={rune.text.primary}>{name}</Text>
      <Text fontSize="2xs" color={rune.text.subtle}>{access}</Text>
    </Box>
  </HStack>
  {/* Input/Output ports */}
  <Box position="absolute" left="-5px" top="50%" transform="translateY(-50%)"
    w="8px" h="8px" borderRadius="full" bg={rune.overlay.hover} />
  <Box position="absolute" right="-5px" top="50%" transform="translateY(-50%)"
    w="8px" h="8px" borderRadius="full" bg={rune.overlay.hover} />
</Box>
```

### Markdown Skill Preview
```tsx
<Box fontFamily="mono" fontSize="xs" lineHeight={2.2}>
  <Text color={rune.accent.blue} fontWeight={600}># Heading</Text>
  <Text color={rune.text.placeholder}>---</Text>
  <Text color={rune.text.muted}>Line with <Text as="span" color={rune.text.secondary}>highlighted</Text> text</Text>
</Box>
```

### Option Pill (clarification cards)
```tsx
// Selected
<Box px={3} py={1.5} fontSize="xs" fontWeight="medium" borderRadius="md"
  bg={rune.overlay.hover} color={rune.text.primary}>
  Option
</Box>

// Unselected
<Box px={3} py={1.5} fontSize="xs" fontWeight="medium" borderRadius="md"
  bg={rune.overlay.soft} color={rune.text.muted}>
  Option
</Box>
```

### Card Footer Divider + Summary
```tsx
<Box px={3} pt={3} mt="auto">
  <Box h="1px" bg={rune.overlay.grid} mb={3} />
  <HStack justify="space-between">
    <Text fontSize="2xs" color={rune.text.placeholder}>Label</Text>
    <HStack spacing={1.5}>
      <Icon as={SomeIcon} boxSize="10px" color={rune.text.secondary} />
      <Text fontSize="2xs" fontFamily="mono" color={rune.text.secondary} fontWeight="medium">Value</Text>
    </HStack>
  </HStack>
</Box>
```

---

## ActivityIcon (animated 3x3 grid)

A 9-cell SVG grid with per-cell pulsing animation. Each activity type has a unique color, accent color, cell highlight pattern, duration, and stagger order.

```tsx
// Presets: thinking, reading, writing, editing, running, analyzing, reviewing
// Each has: color, accent, accentCells (highlighted indices), duration, stagger order
// CSS keyframe: activity-pulse (0%,100% opacity:0 → 10% opacity:1 → 40% opacity:0)
```

Use `ActivityIconMini` at `size={14}` inline with tool card rows.

---

## Screenshot/Window Chrome Pattern

```tsx
<Box
  bg="linear-gradient(145deg, #1c1c1c 0%, #161616 100%)"
  border="1px solid"
  borderColor="rgba(255,255,255,0.08)"
  borderRadius="16px"
  boxShadow="0 0 80px rgba(168, 85, 247, 0.08), 0 20px 60px rgba(0,0,0,0.5)"
  overflow="hidden"
>
  {/* Window chrome bar */}
  <Flex h="40px" bg="rgba(255,255,255,0.03)" borderBottom="1px solid" borderColor="rgba(255,255,255,0.06)" align="center" px={4} gap={2}>
    <Box w="12px" h="12px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
    <Box w="12px" h="12px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
    <Box w="12px" h="12px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
  </Flex>
  {/* Dot grid background */}
  <Box sx={{
    backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "24px 24px",
  }} />
  {/* IDE sidebar placeholder */}
  <Box position="absolute" left={0} top={0} bottom={0} w="200px" bg="rgba(255,255,255,0.02)" borderRight="1px solid" borderColor="rgba(255,255,255,0.05)">
    {/* Skeleton bars */}
    <Box h="28px" mx={3} my={2} borderRadius="4px" bg="rgba(255,255,255,0.02)" />
  </Box>
</Box>
```

---

## Coin Visual ($RUNE Page)

```tsx
<Flex
  w={{ base: "180px", md: "220px" }}
  h={{ base: "180px", md: "220px" }}
  borderRadius="full"
  alignItems="center"
  justifyContent="center"
  sx={{
    background: `
      radial-gradient(circle at 35% 35%, rgba(255,255,255,0.06) 0%, transparent 60%),
      linear-gradient(145deg, #1c1c1c 0%, #161616 100%)
    `,
    boxShadow: `
      0 0 0 2px rgba(255,255,255,0.08),
      0 0 0 6px rgba(255,255,255,0.03),
      0 0 0 8px rgba(255,255,255,0.06),
      0 8px 32px rgba(0,0,0,0.5),
      0 0 60px rgba(20, 141, 255, 0.06)
    `,
  }}
>
  {/* Inner ring */}
  <Flex
    w={{ base: "150px", md: "184px" }}
    h={{ base: "150px", md: "184px" }}
    borderRadius="full"
    alignItems="center"
    justifyContent="center"
    border="1px solid"
    borderColor="rgba(255,255,255,0.06)"
    bg="rgba(255,255,255,0.02)"
  >
    <Image src="/rune-logo.webp" h={{ base: "56px", md: "64px" }} filter="brightness(0.9)" />
  </Flex>
</Flex>
```

---

## Countdown Timer Pattern (Download Page)

```tsx
<Flex justify="center" align="baseline" gap={{ base: 3, md: 6 }} flexWrap="wrap">
  {units.map((unit, i, arr) => (
    <HStack spacing={{ base: 3, md: 6 }}>
      <VStack spacing={1}>
        <Heading
          fontSize={{ base: "5xl", md: "9xl" }}
          fontWeight={700}
          letterSpacing="-0.03em"
          lineHeight={1}
          fontFamily="mono"
          color="gray.50"
        >
          {pad(unit.value)}
        </Heading>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.500"
          fontWeight={500}
          textTransform="uppercase"
          letterSpacing="0.1em"
        >
          {unit.label}
        </Text>
      </VStack>
      {/* Colon separator */}
      {i < arr.length - 1 && (
        <Heading fontSize={{ base: "4xl", md: "7xl" }} fontWeight={700} color="gray.500" lineHeight={1} mt={{ base: "-8px", md: "-16px" }}>:</Heading>
      )}
    </HStack>
  ))}
</Flex>
```

---

## DarkVeil Shader Background

The `DarkVeil` component provides animated/static generative backgrounds using OGL WebGL. Props:

```tsx
<DarkVeil
  hueShift={25}           // color rotation in degrees
  noiseIntensity={0.05}   // grain overlay (0–0.1)
  scanlineIntensity={0}   // CRT scanline effect
  speed={0.25}            // animation speed (0 = static)
  scanlineFrequency={0}
  warpAmount={0}          // distortion amount
  resolutionScale={1.35}  // render resolution multiplier
/>
```

Usage across the site:
- **Hero:** `speed={0.25}`, `hueShift={25}`, `noiseIntensity={0.05}`, `resolutionScale={1.35}`, `warpAmount={0}`
- **CTA:** `speed={0}` (static), `warpAmount={0.3}`, `noiseIntensity={0.03}`, `resolutionScale={1.25}`
- **Download page:** `speed={0.15}`, `warpAmount={0.2}`, `noiseIntensity={0.03}`, `resolutionScale={1}`, `opacity={0.5}`
- **$RUNE page:** Same as Download

---

## Animation & Transition Patterns

### Scroll-Triggered Entrance (AnimatedSection)
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
>
```
Uses `useInView(ref, { once: true, margin: "-100px" })`.

### Carousel Content Swap
```tsx
<AnimatePresence mode="wait">
  <MotionFlex
    key={uniqueKey}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
```

### Carousel Slide Translation
```tsx
style={{
  transform: `translateX(-${scrollIndex * 316}px)`,
  transition: "transform 0.5s cubic-bezier(0.25, 0.4, 0.25, 1)",
}}
```

### CSS Transition Values (hover/interaction)
```
transition="all 0.2s"                    — buttons, links, general
transition="all 0.2s ease"              — icon buttons, chevrons
transition="all 0.25s ease"             — tabs
transition="all 0.3s ease"              — navbar blur/border
transition="color 0.25s ease"           — tab text color
transition="opacity 0.4s ease"          — left edge fade visibility
```

---

## Footer (`src/components/Footer.tsx`)

```tsx
<Box
  as="footer"
  bg="#171717"
  position="relative"
  zIndex={1}
  borderTop="1px dashed"
  borderColor="rgba(255,255,255,0.12)"
  py={8}
  px={{ base: 5, md: 8 }}
>
```

- Logo: `<Image src="/rune-logo.webp" h="24px" w="auto" />`
- Links: `fontSize="sm"`, `color="gray.500"`, `_hover={{ color: "gray.300" }}`
- Link text hidden on mobile: `display={{ base: "none", sm: "block" }}`
- Copyright: `fontSize="xs"`, `color="gray.600"`

---

## Video Placeholder

```tsx
<Box
  w="100%"
  maxW="960px"
  h={{ base: "300px", md: "500px" }}
  bg="#000"
  borderRadius="12px"
  border="1px solid rgba(255,255,255,0.08)"
/>
```

---

## Responsive Breakpoints

Use Chakra's object syntax:
```tsx
fontSize={{ base: "6xl", md: "7xl", lg: "8xl" }}
px={{ base: 5, md: 8 }}
direction={{ base: "column", md: "row" }}
w={{ base: "270px", md: "300px" }}
h={{ base: "460px", md: "520px" }}
py={{ base: 20, md: 32 }}
```

The site primarily uses `base` and `md` breakpoints, occasionally `lg` for hero headings. Some footer elements use `sm` for show/hide.

---

## Key Rules

1. **No CSS files** — all styling via Chakra props and `sx` prop
2. **No Tailwind** — this project uses Chakra UI exclusively
3. **Always `"use client"`** — all components are client components
4. **Background is always `#171717`** — never pure black (#000 only for video placeholder), never anything else for page bg
5. **White text uses `gray.50` (#e6e6e6)** — never pure `#ffffff` for text. Use `rune.text.primary` (#f5f5f5) only inside card visuals
6. **Borders use rgba white** — never solid white borders
7. **Font weight hierarchy:** 400 (body), 500 (buttons/links/nav), 600 (card titles/active states/semibold labels), 700 (headings only)
8. **Border radius hierarchy:** `full` (buttons/pills/tabs/dots), `20px` or `xl` (feature cards), `16px` (screenshots), `12px` (glass icons, video placeholder), `lg` (active rows, segmented controls), `md` (tool rows, option pills, code blocks), `8px` (tags/badges, tooltips), `4px` or `sm` (skeleton bars, color swatches)
9. **Spacing:** Chakra numeric scale — `px={{ base: 5, md: 8 }}` for container padding is standard
10. **Icons:** Primarily from `react-icons/fi` (Feather), `boxSize` range `3`–`4` (12–16px). `react-icons/hi2` for `HiOutlineCommandLine` only
11. **Fonts:** Geist Sans for body/heading, Geist Mono for code/mono UI. Loaded via CSS variables, NOT @fontsource
12. **MotionFlex pattern:** Use `motion.create(Flex)` (not `motion(Flex)`) for Framer Motion + Chakra components
