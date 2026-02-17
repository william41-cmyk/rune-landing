"use client";

import { Box, Text, VStack } from "@chakra-ui/react";


export default function VideoSection() {
  return (
    <Box as="section" pt={0} pb={{ base: 10, md: 16 }} px={{ base: 5, md: 8 }}>
      <VStack justify="center" align="center">
        <Text
          fontSize={{ base: "md", md: "3.5xl" }}
          color="gray.400"
          lineHeight={1.3}
          textAlign="center"
          maxW="680px"
          mb={6}
        >
          Visual multi-agent framework for building
          custom AI orchestration pipelines
          to turn your ideas into
          production-ready code.
        </Text>
        <Box
          w="100%"
          maxW="960px"
          borderRadius="12px"
          border="1px solid rgba(255,255,255,0.08)"
          overflow="hidden"
          bg="#000"
        >
          <Box
            as="video"
            src="/showcase.mp4"
            autoPlay
            loop
            muted
            playsInline
            w="100%"
            h="auto"
            display="block"
            sx={{
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </Box>
      </VStack>
    </Box>
  );
}