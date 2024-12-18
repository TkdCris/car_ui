import { HStack } from "@chakra-ui/react";

import { RightContent } from "./right-content";
import { LeftContent } from "./left-content";

interface MainHeaderProps {
  toogleMenu: () => void;
}

export function MainHeader({ toogleMenu }: MainHeaderProps) {
  return (
    <HStack
      w="full"
      alignItems="center"
      justifyContent="space-between"
      py="2"
      color="header.text"
      bg="header.bg"
    >
      <LeftContent toogleMenu={toogleMenu} />
      <RightContent />
    </HStack>
  );
}
