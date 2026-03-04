"use client";

import { useState } from "react";
import { Box, Flex, Text, Button, useColorMode } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import PixelBlast from "@/components/PixelBlast";

export default function TempPage() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);
  const [offset, setOffset] = useState(669);
  const [key, setKey] = useState(0);

  const change = (delta: number) => {
    setOffset((o) => o + delta);
    setKey((k) => k + 1);
  };

  return (
    <Box w="100vw" h="50vh" bg={c.bg} position="relative" overflow="hidden">
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
        position="fixed"
        bottom={6}
        left="50%"
        transform="translateX(-50%)"
        align="center"
        gap={3}
        bg={c.surface}
        border="1px solid"
        borderColor={c.border.subtle}
        borderRadius="full"
        px={5}
        py={2}
        zIndex={10}
      >
        <Button size="sm" borderRadius="full" bg={c.overlay.strong} color={c.text.primary}
          _hover={{ bg: c.overlay.intense }} onClick={() => change(-10)}>
          -10
        </Button>
        <Button size="sm" borderRadius="full" bg={c.overlay.strong} color={c.text.primary}
          _hover={{ bg: c.overlay.intense }} onClick={() => change(-1)}>
          -1
        </Button>
        <Text fontSize="sm" fontWeight={600} color={c.text.primary} fontFamily="mono" minW="60px" textAlign="center">
          {offset}
        </Text>
        <Button size="sm" borderRadius="full" bg={c.overlay.strong} color={c.text.primary}
          _hover={{ bg: c.overlay.intense }} onClick={() => change(1)}>
          +1
        </Button>
        <Button size="sm" borderRadius="full" bg={c.overlay.strong} color={c.text.primary}
          _hover={{ bg: c.overlay.intense }} onClick={() => change(10)}>
          +10
        </Button>
      </Flex>
    </Box>
  );
}
