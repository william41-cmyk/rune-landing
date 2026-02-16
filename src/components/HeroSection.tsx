"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import DarkVeil from "./DarkVeil";

const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionBox = motion.create(Box);

export default function HeroSection() {
  return (
    <Box position="relative" h="50vh" minH="400px" overflow="hidden" id="hero">
      {/* Shader Background */}
      <Box position="absolute" inset={0} overflow="hidden">
        <DarkVeil
          hueShift={25}
          noiseIntensity={0.05}
          scanlineIntensity={0}
          speed={0.25}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1.35}
        />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={1}
        direction="column"
        align="center"
        justify="center"
        h="100%"
        pt="80px"
        pb="0"
        px={{ base: 5, md: 8 }}
      >
        <VStack spacing={6} maxW="860px" textAlign="center" mb={0}>

          {/* Headline */}
          <MotionHeading
            as="h1"
            fontSize={{ base: "6xl", md: "7xl", lg: "8xl" }}
            fontWeight={700}
            lineHeight={1.05}
            letterSpacing="-0.03em"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            sx={{
              background: "#e6e6e6",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Agentic Engineering Made Easier
          </MotionHeading>

          {/* Subheadline */}
          <MotionText
            fontSize={{ base: "xl", md: "3xl" }}
            color="gray.400"
            maxW="640px"
            lineHeight={1.3}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Visual multi-agent framework that lets you
            build custom orchestration pipelines
            to turn your ideas into
            production-ready code.
          </MotionText>

          {/* CTAs */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <VStack spacing={3}>
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
              <Text fontSize="2xs" color="gray.500">
                MacOS, Windows & Linux
              </Text>
            </VStack>
          </MotionBox>
        </VStack>

      </Flex>

      {/* Bottom gradient into next section */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="120px"
        bg="linear-gradient(to bottom, transparent, #171717)"
        zIndex={2}
        pointerEvents="none"
      />
    </Box>
  );
}
