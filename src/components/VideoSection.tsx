"use client";

import { Box, Flex } from "@chakra-ui/react";

export default function VideoSection() {
  return (
    <Box pt={{ base: 0, md: 1 }} pb={{ base: 10, md: 16 }} px={{ base: 5, md: 8 }}>
      <Flex justify="center">
        <Box
          w="100%"
          maxW="960px"
          h={{ base: "300px", md: "500px" }}
          bg="#000"
          borderRadius="12px"
          border="1px solid rgba(255,255,255,0.08)"
        />
      </Flex>
    </Box>
  );
}