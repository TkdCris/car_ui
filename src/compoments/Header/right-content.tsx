import { AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export function RightContent() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems="center" gap={4}>
      <Heading as="h1" size="md" gap="4" display={{ base: "none", md: "flex" }}>
        <p>NomeCliente</p>
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
        {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Flex>
  );
}
