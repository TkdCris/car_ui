import { HStack } from "@chakra-ui/react";

import { RightContent } from "./right-content";
import { LeftContent } from "./left-content";

export function Header() {
  return (
    <HStack
      w="full"
      alignItems="center"
      justifyContent="space-between"
      py="2"
      px="8"
      color="header.text"
      bg="header.bg"
    >
      <LeftContent />
      <RightContent />
    </HStack>
  );
}
