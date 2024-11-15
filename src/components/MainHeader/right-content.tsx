"use client";

import { Flex, Heading } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";

export function RightContent() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex color="header.text" alignItems="center" gap={4}>
      <Heading as="h1" size="md" gap="4" display={{ base: "none", md: "flex" }}>
        <p>Filial</p>
      </Heading>
      <Avatar size="sm" name="" />
      <Button
        bg="inherit"
        _hover={{
          transform: "scale(1.4)",
          transition: "transform 0.2s",
        }}
        _active={{
          transform: "rotate(180deg)",
        }}
        onClick={toggleColorMode}
      >
        {colorMode === "light" ? <SunIcon /> : <MoonIcon color="#C2C7C9" />}
      </Button>
    </Flex>
  );
}
