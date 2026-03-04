"use client";

import { useState, useRef } from "react";
import { Box, Flex, Text, Button, HStack, Image, useColorMode } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import PixelBlast from "@/components/PixelBlast";

type Tab = "pixel" | "og";

const ogPages = [
  { id: "home", label: "Home", heading: "" },
  { id: "code", label: "Code", heading: "Code" },
  { id: "grab", label: "Grab", heading: "Grab" },
  { id: "framework", label: "Framework", heading: "Framework" },
  { id: "download", label: "Download", heading: "Download Rune" },
  { id: "changelog", label: "Changelog", heading: "Changelog" },
  { id: "docs", label: "Docs", heading: "Documentation" },
];

export default function TempPage() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);
  const [offset, setOffset] = useState(669);
  const [key, setKey] = useState(0);
  const [tab, setTab] = useState<Tab>("pixel");
  const [ogIndex, setOgIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const change = (delta: number) => {
    setOffset((o) => o + delta);
    setKey((k) => k + 1);
  };

  const currentOg = ogPages[ogIndex];

  return (
    <Box w="100vw" h="100vh" bg={c.bg} position="relative" overflow="hidden">
      {/* Tab switcher */}
      <Flex position="fixed" top={4} left="50%" transform="translateX(-50%)" zIndex={20}
        bg={c.surface} border="1px solid" borderColor={c.border.subtle}
        borderRadius="full" p={1} gap={1}>
        <Button size="sm" borderRadius="full" px={5}
          bg={tab === "pixel" ? c.overlay.intense : "transparent"}
          color={tab === "pixel" ? c.text.primary : c.text.muted}
          fontWeight={tab === "pixel" ? 600 : 400} fontSize="xs"
          _hover={{ bg: tab === "pixel" ? c.overlay.intense : c.overlay.soft }}
          onClick={() => setTab("pixel")}>
          PixelBlast
        </Button>
        <Button size="sm" borderRadius="full" px={5}
          bg={tab === "og" ? c.overlay.intense : "transparent"}
          color={tab === "og" ? c.text.primary : c.text.muted}
          fontWeight={tab === "og" ? 600 : 400} fontSize="xs"
          _hover={{ bg: tab === "og" ? c.overlay.intense : c.overlay.soft }}
          onClick={() => setTab("og")}>
          OG Images
        </Button>
      </Flex>

      {tab === "pixel" && (
        <>
          <Box position="absolute" inset={0}>
            <PixelBlast
              key={key}
              pixelSize={6}
              color={c.pixelBlast}
              enableRipples={false}
              speed={0}
              edgeFade={0.5}
              transparent={true}
              timeOffset={offset}
            />
          </Box>
          <Flex
            position="fixed" bottom={6} left="50%" transform="translateX(-50%)"
            align="center" gap={3}
            bg={c.surface} border="1px solid" borderColor={c.border.subtle}
            borderRadius="full" px={5} py={2} zIndex={10}
          >
            <Button size="sm" borderRadius="full" bg={c.overlay.strong} color={c.text.primary}
              _hover={{ bg: c.overlay.intense }} onClick={() => change(-10)}>-10</Button>
            <Button size="sm" borderRadius="full" bg={c.overlay.strong} color={c.text.primary}
              _hover={{ bg: c.overlay.intense }} onClick={() => change(-1)}>-1</Button>
            <Text fontSize="sm" fontWeight={600} color={c.text.primary} fontFamily="mono" minW="60px" textAlign="center">
              {offset}
            </Text>
            <Button size="sm" borderRadius="full" bg={c.overlay.strong} color={c.text.primary}
              _hover={{ bg: c.overlay.intense }} onClick={() => change(1)}>+1</Button>
            <Button size="sm" borderRadius="full" bg={c.overlay.strong} color={c.text.primary}
              _hover={{ bg: c.overlay.intense }} onClick={() => change(10)}>+10</Button>
          </Flex>
        </>
      )}

      {tab === "og" && (
        <Flex direction="column" align="center" justify="center" h="100vh" gap={6}>
          {/* OG Card — 1920x1080 */}
          <Box
            ref={cardRef}
            w="1920px"
            h="1080px"
            bg={c.bg}
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor={c.border.subtle}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <HStack spacing={6} align="center">
              <Image src="/rune-icon.svg" alt="Rune" h="190px" w="auto" filter={isDark ? "none" : "invert(1)"} />
              <Text
                fontSize="140px"
                fontWeight={700}
                color={c.text.primary}
                letterSpacing="-0.05em"
                lineHeight={1}
              >
                {currentOg.heading}
              </Text>
            </HStack>
          </Box>

          {/* Page selector + generate */}
          <Flex align="center" gap={4}>
            <Flex
              bg={c.surface} border="1px solid" borderColor={c.border.subtle}
              borderRadius="full" p={1} gap={1} flexWrap="wrap" justify="center"
            >
              {ogPages.map((page, i) => (
                <Button key={page.id} size="sm" borderRadius="full" px={4}
                  bg={ogIndex === i ? c.overlay.intense : "transparent"}
                  color={ogIndex === i ? c.text.primary : c.text.muted}
                  fontWeight={ogIndex === i ? 600 : 400} fontSize="xs"
                  _hover={{ bg: ogIndex === i ? c.overlay.intense : c.overlay.soft }}
                  onClick={() => setOgIndex(i)}>
                  {page.label}
                </Button>
              ))}
            </Flex>
          </Flex>
          <Text fontSize="xs" color={c.text.muted}>
            og-{currentOg.id}.png — 1920 × 1080
          </Text>
        </Flex>
      )}
    </Box>
  );
}
