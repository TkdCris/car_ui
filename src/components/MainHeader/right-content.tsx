import { Flex, Heading } from "@chakra-ui/react";

import { Avatar } from "../ui/avatar";
import { SwitchTheme } from "../SwitchTheme";

export function RightContent() {
  return (
    <Flex color="header.text" alignItems="center" gap={4}>
      <Heading as="h1" size="md" gap="4" display={{ base: "none", md: "flex" }}>
        <p>Filial</p>
      </Heading>
      <Avatar size="sm" name="" />
      <SwitchTheme />
    </Flex>
  );
}
