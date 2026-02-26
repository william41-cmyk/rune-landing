"use client";

import { Box, Text, Flex } from "@chakra-ui/react";

interface ScreenshotPlaceholderProps {
  label: string;
  height?: string;
  fadeBottom?: boolean;
}

export default function ScreenshotPlaceholder({
  label,
  height = "500px",
  fadeBottom = false,
}: ScreenshotPlaceholderProps) {
  return (
    <Box position="relative" w="100%" maxW="1100px" mx="auto">
      <Box
        h={height}
        bg="linear-gradient(145deg, #1c1c1c 0%, #161616 100%)"
        border="1px solid"
        borderColor="rgba(255,255,255,0.08)"
        borderRadius="16px"
        boxShadow="0 0 80px rgba(168, 85, 247, 0.08), 0 20px 60px rgba(0,0,0,0.5)"
        overflow="hidden"
        position="relative"
      >
        <Flex
          h="40px"
          bg="rgba(255,255,255,0.03)"
          borderBottom="1px solid"
          borderColor="rgba(255,255,255,0.06)"
          align="center"
          px={4}
          gap={2}
        >
          <Box w="12px" h="12px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
          <Box w="12px" h="12px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
          <Box w="12px" h="12px" borderRadius="full" bg="rgba(255,255,255,0.1)" />
        </Flex>
        <Flex
          h="calc(100% - 40px)"
          align="center"
          justify="center"
          position="relative"
          sx={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <Box position="absolute" left={0} top={0} bottom={0} w="200px" bg="rgba(255,255,255,0.02)" borderRight="1px solid" borderColor="rgba(255,255,255,0.05)">
            {[...Array(8)].map((_, i) => (
              <Box key={i} h="28px" mx={3} my={2} borderRadius="4px" bg={`rgba(255,255,255,${i === 2 ? '0.06' : '0.02'})`} />
            ))}
          </Box>
          <Flex direction="column" align="center" gap={3}>
            <Box w="48px" h="48px" borderRadius="12px" bg="rgba(168, 85, 247, 0.1)" border="1px solid" borderColor="rgba(168, 85, 247, 0.2)" />
            <Text
              color="gray.500"
              fontSize="sm"
              fontFamily="mono"
              fontWeight={500}
              letterSpacing="0.05em"
            >
              {label}
            </Text>
          </Flex>
        </Flex>
      </Box>
      {fadeBottom && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="120px"
          bg="linear-gradient(to bottom, transparent, #171717)"
          borderRadius="0 0 16px 16px"
          pointerEvents="none"
        />
      )}
    </Box>
  );
}
