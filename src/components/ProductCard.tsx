"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  HStack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import type { IconType } from "react-icons";
import { colors } from "@/theme/colors";

interface ProductCardProps {
  name: string;
  description: string;
  href?: string;
  icon?: IconType;
  img?: string;
  placeholder?: string;
  iconColor?: string;
  badge?: string;
  locked?: boolean;
}

export default function ProductCard({
  name,
  description,
  href,
  icon,
  img,
  placeholder,
  iconColor,
  badge,
  locked,
}: ProductCardProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  const card = (
    <Flex
      direction="column"
      h="100%"
      p={5}
      borderRadius="16px"
      border="1px solid"
      borderColor={c.border.subtle}
      bg={c.overlay.subtle}
      cursor={locked ? "default" : "pointer"}
      role="group"
      transition="all 0.25s ease"
      position="relative"
      overflow="hidden"
      {...(!locked && {
        _hover: {
          bg: c.overlay.medium,
          borderColor: c.border.default,
          boxShadow: c.shadow.card,
        },
      })}
    >
      {locked && (
        <Box
          position="absolute"
          inset={0}
          zIndex={3}
          backdropFilter="blur(6px)"
          bg={isDark ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)"}
          borderRadius="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box>
      )}

      <HStack spacing={4} align="center">
        <Flex
          w="48px"
          h="48px"
          borderRadius="12px"
          align="center"
          justify="center"
          bg={c.overlay.hover}
          flexShrink={0}
          overflow="hidden"
        >
          {placeholder ? (
            <Text
              fontSize="xl"
              fontWeight={700}
              color={c.text.muted}
              userSelect="none"
            >
              {placeholder}
            </Text>
          ) : img ? (
            <Image
              src={img}
              alt={name}
              boxSize="40px"
              borderRadius="8px"
              objectFit="cover"
            />
          ) : icon ? (
            <Icon
              as={icon}
              boxSize="22px"
              color={iconColor || c.text.primary}
            />
          ) : (
            <Image
              src="/rune-icon.svg"
              alt="Rune"
              boxSize="22px"
              filter={isDark ? "invert(1)" : "none"}
              opacity={0.5}
            />
          )}
        </Flex>
        <Box flex={1}>
          <Heading
            fontSize="md"
            fontWeight={600}
            letterSpacing="-0.03em"
            color={c.text.primary}
            mb={0.5}
          >
            {name}
          </Heading>
          <Text
                letterSpacing="-0.03em"
            fontSize="xs"
            color={c.text.muted}
            lineHeight={1.5}
          >
            {description}
          </Text>
        </Box>
      </HStack>
    </Flex>
  );

  if (locked || !href) {
    return card;
  }

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      {card}
    </Link>
  );
}
