---
name: rune-styling
description: Styling reference for the Rune landing page. Use when creating new components, sections, or UI elements to ensure visual consistency.
---

# Rune Landing Page — Styling Reference

Use this skill whenever creating new components, sections, or UI elements for the Rune landing page. Follow every pattern documented below to ensure visual consistency.

## Tech Stack

- **Framework:** Next.js 15 (App Router, `"use client"` components)
- **UI Library:** Chakra UI v2 (`@chakra-ui/react`) — all layout/styling via Chakra props, NO Tailwind, NO CSS files
- **Animation:** Framer Motion v11 (`motion.create()` pattern for Chakra components)
- **Icons:** `react-icons/fi` (Feather icons)
- **Fonts:** `@fontsource/ubuntu` (400, 500, 700), `@fontsource/jetbrains-mono` (400)

---

## Theme (`src/theme/index.ts`)

### Color Mode
- Dark mode only: `initialColorMode: "dark"`, `useSystemColorMode: false`

### Fonts
```
heading: 'Ubuntu', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
body:    'Ubuntu', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
mono:    'JetBrains Mono', ui-monospace, "SF Mono", Menlo, Monaco, monospace
```

### Font Sizes (custom scale)
| Token  | px   | Usage                              |
|--------|------|------------------------------------|
| `2xs`  | 11px | pill text, platform labels         |
| `xs`   | 12px | copyright, mono node labels        |
| `sm`   | 13px | footer links, small UI text        |
| `md`   | 14px | buttons, nav links, card body      |
| `lg`   | 15px | descriptions, detail text          |
| `xl`   | 16px | card titles, body text (mobile)    |
| `2xl`  | 18px | logo, mode descriptions            |
| `3xl`  | 20px | subheadings, body text (desktop)   |
| `3.5xl`| 22px | medium subheadings                 |
| `4xl`  | 32px | section headings (mobile)          |
| `5xl`  | 36px | CTA heading (mobile)               |
| `6xl`  | 44px | hero heading (mobile)              |
| `7xl`  | 48px | section headings (desktop)         |
| `8xl`  | 55px | hero heading (desktop)             |
| `9xl`  | 56px | CTA heading (desktop)              |
| `10xl` | 64px | hero heading (tablet)              |

### Gray Palette
```
gray.50:  #e6e6e6   (primary text, light surfaces)
gray.100: #e5e5e5
gray.200: #d4d4d4   (hover states)
gray.300: #a3a3a3   (secondary text)
gray.400: #737373   (muted text, descriptions)
gray.500: #525252   (subtle text, borders)
gray.600: #404040   (very subtle text)
gray.700: #333333
gray.800: #262626
gray.900: #1c1c1c   (elevated surfaces)
gray.950: #0d0d0d
```

### Brand Colors
```
brand.bg:           #171717  (page background — THE primary bg everywhere)
brand.surface:      #161616  (card/panel backgrounds)
brand.surfaceLight: #1c1c1c  (elevated panels)
```

### Accent Colors (used throughout cards & visuals)
```
Purple:  #a855f7 / #c084fc (lighter)  — rgba(168,85,247,…)
Blue:    #3b82f6 / #60a5fa (lighter)  — rgba(59,130,246,…)
Green:   #22c55e / #4ade80 (lighter)  — rgba(34,197,94,…)
Amber:   #f59e0b / #fbbf24 (lighter)  — rgba(245,158,11,…)
```

### Selection Color
```css
::selection { bg: rgba(168, 85, 247, 0.3); color: white; }
```

---

## Global Layout Patterns

### Page Container
```tsx
<Box minH="100vh" bg="#171717" overflowX="hidden">
  <Box
    maxW="1200px"
    mx="auto"
    position="relative"
    borderLeft="1px dashed"
    borderRight="1px dashed"
    borderColor="rgba(255,255,255,0.08)"
  >
    {/* sections go here */}
  </Box>
</Box>
```

### Section Container (inner content)
```tsx
maxW="1100px"  // content narrower than outer 1200px container
mx="auto"
px={{ base: 5, md: 8 }}
py={{ base: 20, md: 32 }}  // generous vertical padding
```

---

## Common Component Patterns

### Primary Button (light on dark)
```tsx
<Button
  bg="#e6e6e6"
  color="#171717"
  fontWeight={500}
  fontSize="md"            // 14px
  borderRadius="full"      // pill shape
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

### Nav Link
```tsx
<ChakraLink
  fontSize="md"
  fontWeight={500}
  color="gray.400"
  _hover={{ color: "gray.50", textDecoration: "none" }}
  transition="all 0.2s"
>
```

### Section Heading
```tsx
<Heading
  fontSize={{ base: "3xl", md: "3.5xl" }}  // responsive
  letterSpacing="-0.02em"                   // tight tracking
  lineHeight={1.3}
  color="gray.50"
>
```

### Hero/CTA Large Heading (gradient text)
```tsx
<Heading
  fontSize={{ base: "6xl", md: "7xl", lg: "8xl" }}
  fontWeight={700}
  lineHeight={1.05}
  letterSpacing="-0.03em"
  sx={{
    background: "#e6e6e6",  // or "linear-gradient(180deg, #f5f5f5 0%, #a3a3a3 100%)"
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
```

### Body/Subheading Text
```tsx
<Text
  fontSize={{ base: "xl", md: "3xl" }}
  color="gray.400"
  lineHeight={1.3}
  maxW="640px"
>
```

### Description Text (cards, smaller contexts)
```tsx
<Text fontSize="sm" color="gray.400" lineHeight={1.6}>
```

---

## Border & Surface Patterns

### Dashed Borders (structural lines)
```
borderLeft="1px dashed"  borderColor="rgba(255,255,255,0.08)"
borderTop="1px dashed"   borderColor="rgba(255,255,255,0.06)"
```

### Solid Borders (cards, panels)
```
border="1px solid"  borderColor="rgba(255,255,255,0.08)"   // standard
border="1px solid"  borderColor="rgba(255,255,255,0.04)"   // subtle
border="1px solid"  borderColor="rgba(255,255,255,0.02)"   // barely visible
```

### Surface Backgrounds
```
rgba(255,255,255,0.03)  — pill containers, subtle panels
rgba(255,255,255,0.04)  — list items, rows, inactive states
rgba(255,255,255,0.05)  — progress bar tracks
rgba(255,255,255,0.06)  — borders inside panels
rgba(255,255,255,0.08)  — active list items, hover states
rgba(255,255,255,0.1)   — glass icon background, active tabs
rgba(255,255,255,0.15)  — decorative dots
```

### Gradient Fades (section transitions)
```tsx
// Bottom fade into next section
<Box
  position="absolute" bottom={0} left={0} right={0}
  h="120px"
  bg="linear-gradient(to bottom, transparent, #171717)"
  zIndex={2}
  pointerEvents="none"
/>

// Top fade from previous section
<Box
  position="absolute" top={0} left={0} right={0}
  h="300px"
  bg="linear-gradient(to bottom, #171717, transparent)"
  zIndex={1}
  pointerEvents="none"
/>
```

### Right-Edge Fade (carousels)
```tsx
<Box
  position="absolute" top={0} right={0} bottom={0}
  w={{ base: "80px", md: "160px" }}
  pointerEvents="none"
  bg="linear-gradient(to right, transparent, #171717)"
  zIndex={2}
/>
```

---

## Glass Morphism Pattern

### Glass Icon
```tsx
<Box
  display="inline-flex"
  w="40px" h="40px"
  borderRadius="12px"
  alignItems="center" justifyContent="center"
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
  h={{ base: "460px", md: "520px" }}
  borderRadius="20px"
  overflow="hidden"
  cursor="pointer"
  role="group"
  transition="all 0.35s cubic-bezier(0.25, 0.4, 0.25, 1)"
  bg={`linear-gradient(160deg,
    hsla(${tint}, 35%, 0.6) 0%,
    hsla(${tint}, 25%, 0.2) 40%,
    rgba(20, 20, 20, 0.2) 100%
  )`}
  border="1px solid"
  borderColor="rgba(255,255,255,0.02)"
  sx={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
>
```

- Card tint values use HSL `"hue, saturation%"` format: `"270, 60%"` (purple), `"210, 60%"` (blue), `"150, 50%"` (green), `"35, 65%"` (amber)
- Cards have a bottom fade overlay: `linear-gradient(to top, rgba(14,14,14,0.5), transparent)`

### Pill / Tab Switcher
```tsx
<Flex
  bg="rgba(255,255,255,0.03)"
  border="1px solid" borderColor="rgba(255,255,255,0.06)"
  borderRadius="full"
  p={1}
>
  {tabs.map((tab, i) => (
    <Flex
      px={{ base: 4, md: 5 }} py={2}
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
      />
    </Flex>
  ))}
</Flex>
```

### Icon Button (arrows, controls)
```tsx
<IconButton
  variant="unstyled"
  display="flex" alignItems="center" justifyContent="center"
  w="40px" h="40px" minW="40px"
  borderRadius="full"
  color="gray.400"
  bg="rgba(255,255,255,0.04)"
  border="1px solid" borderColor="rgba(255,255,255,0.08)"
  transition="all 0.2s"
  _hover={{ bg: "rgba(255,255,255,0.08)", color: "gray.100" }}
/>
```

---

## Status Indicators

### Dot with Glow
```tsx
<Box w="8px" h="8px" borderRadius="full" bg="#22c55e" boxShadow="0 0 6px #22c55e" />
```

### Running Status Pill
```tsx
<Flex
  bg="rgba(34,197,94,0.1)"
  border="1px solid rgba(34,197,94,0.25)"
  borderRadius="full"
  px={4} py={1.5}
  align="center" gap={2}
>
  <Box w="7px" h="7px" borderRadius="full" bg="#22c55e" />
  <Text fontSize="xs" fontFamily="mono" color="#4ade80" fontWeight={600}>Running</Text>
</Flex>
```

### Progress Bars
```tsx
<Box w="100%" h="5px" bg="rgba(255,255,255,0.05)" borderRadius="full">
  <Box w={pct} h="100%" bg={color} borderRadius="full" opacity={0.75} boxShadow={`0 0 10px ${color}30`} />
</Box>
```

---

## Colored Tag/Badge Pattern
```tsx
<Flex
  bg="rgba(245,158,11,0.08)"        // accent color at ~8% opacity
  border="1px solid rgba(245,158,11,0.2)"  // accent at ~20% for border
  borderRadius="8px"
  px={3} py={1.5}
>
  <Text fontSize="xs" fontFamily="mono" color="#fbbf24" fontWeight={500}>Label</Text>
</Flex>
```

Accent color opacity guide for colored elements:
- Background fill: 0.08–0.15
- Border: 0.2–0.35
- Text: full color (#c084fc, #60a5fa, #4ade80, #fbbf24)
- Glow/shadow: `0 0 10px ${color}` or `0 0 6px ${color}`

---

## Animation Patterns

### Framer Motion with Chakra
Create motion components using `motion.create()`:
```tsx
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionBox = motion.create(Box);
```

### Scroll-triggered Fade-in (AnimatedSection wrapper)
```tsx
import AnimatedSection from "./AnimatedSection";

<AnimatedSection delay={0.1}>
  <YourComponent />
</AnimatedSection>
```
- Uses `useInView` with `{ once: true, margin: "-100px" }`
- Animation: `opacity: 0, y: 40` → `opacity: 1, y: 0`
- Duration: 0.7s, easing: `[0.25, 0.4, 0.25, 1]`

### Hero Staggered Entrance
```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.2 }}   // headline
transition={{ duration: 0.7, delay: 0.35 }}  // subheadline
transition={{ duration: 0.7, delay: 0.5 }}   // CTA
```

### Carousel Transition
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

### General Transition Values
```
transition="all 0.2s"                                        // buttons, links
transition="all 0.25s ease"                                  // tabs
transition="all 0.3s ease"                                   // glass hover
transition="all 0.35s cubic-bezier(0.25, 0.4, 0.25, 1)"    // cards
transition="transform 0.5s cubic-bezier(0.25, 0.4, 0.25, 1)" // carousel slide
```

---

## Monospace / Code UI Pattern
```tsx
<Box
  bg="rgba(255,255,255,0.03)"  // or rgba(0,0,0,0.3) for terminal
  borderRadius="10px"
  p={4}
  fontFamily="mono"
  fontSize="xs"               // 12px
  color="gray.500"
  lineHeight={2.2}
  border="1px solid rgba(255,255,255,0.04)"
>
```

---

## Screenshot/Window Chrome Pattern
```tsx
<Box
  bg="linear-gradient(145deg, #1c1c1c 0%, #161616 100%)"
  border="1px solid" borderColor="rgba(255,255,255,0.08)"
  borderRadius="16px"
  boxShadow="0 0 80px rgba(168, 85, 247, 0.08), 0 20px 60px rgba(0,0,0,0.5)"
  overflow="hidden"
>
  {/* Fake window chrome bar */}
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
</Box>
```

---

## DarkVeil Shader Background

The `DarkVeil` component provides animated/static generative backgrounds using OGL WebGL. It accepts these props:
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

Hero uses: `speed={0.25}`, `hueShift={25}`, `noiseIntensity={0.05}`, `resolutionScale={1.35}`
CTA uses: `speed={0}` (static), `warpAmount={0.3}`, `noiseIntensity={0.03}`, `resolutionScale={1.25}`

---

## Responsive Breakpoints (Chakra defaults)

Use Chakra's object syntax for responsive values:
```tsx
fontSize={{ base: "3xl", md: "3.5xl" }}
px={{ base: 5, md: 8 }}
direction={{ base: "column", md: "row" }}
w={{ base: "270px", md: "300px" }}
h={{ base: "460px", md: "520px" }}
```

The site primarily uses `base` and `md` breakpoints, occasionally `lg` for hero headings.

---

## Key Rules

1. **No CSS files** — all styling via Chakra props and `sx` prop
2. **No Tailwind** — this project uses Chakra UI exclusively
3. **Always `"use client"`** — all components are client components
4. **Background is always `#171717`** — never pure black, never anything else
5. **White text uses `gray.50` (#e6e6e6)** — never pure `#ffffff`
6. **Borders use rgba white** — never solid white borders
7. **Font weight hierarchy:** 400 (body), 500 (buttons/links), 600 (card titles/active states), 700 (headings)
8. **Border radius hierarchy:** `full` (buttons/pills), `20px` (cards), `16px` (screenshots), `12px` (glass icons), `10px` (list items/panels), `8px` (tags/badges), `4px` (skeleton bars)
9. **Spacing:** Chakra numeric scale — `px={{ base: 5, md: 8 }}` for container padding is standard
10. **Icons:** Always from `react-icons/fi` (Feather), typical `boxSize` is `3`–`4` (12–16px)
