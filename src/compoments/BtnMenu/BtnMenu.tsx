import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

interface BtnMenuProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function BtnMenu({ icon, children, isSelected, onClick }: BtnMenuProps) {
  return (
    <Button
      variant={"unstyled"}
      h={8}
      pl={4}
      pr={{ base: 4, md: 8 }}
      cursor="pointer"
      _hover={{
        transition: "background-color 0.2s",
        bg: "rgba(255, 255, 255, 0.1)",
      }}
      w={"100%"}
      rounded={0}
      borderRight={isSelected ? 4 : 0}
      borderStyle={"solid"}
      borderColor="menu_detail"
      bg={isSelected ? "rgba(255, 255, 255, 0.1)" : ""}
      onClick={onClick}
    >
      <Flex alignItems="center" gap={4}>
        <Box>{icon}</Box>
        {children}
      </Flex>
    </Button>
  );
}
