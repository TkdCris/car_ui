import React from "react";
import { Button } from "../ui/button";
import { Flex, Icon, Text } from "@chakra-ui/react";

interface BtnMenuProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  isText?: boolean;
}

export function BtnMenu({
  icon,
  children,
  isSelected,
  isText,
  onClick,
}: BtnMenuProps) {
  return (
    <Button
      variant={"ghost"}
      h={8}
      cursor="pointer"
      _hover={{
        transition: "background-color 0.2s",
        bg: "rgba(255, 255, 255, 0.1)",
      }}
      w={"100%"}
      rounded={0}
      borderRight={isSelected ? 4 : 0}
      borderStyle={"solid"}
      borderRightColor="menu.border_detail"
      bg={isSelected ? "rgba(255, 255, 255, 0.1)" : ""}
      onClick={onClick}
      transition="0.3s ease-in-out"
      justifyContent={"start"}
      color="menu.text"
    >
      <Flex alignItems={"center"} gap={4}>
        <Icon>{icon}</Icon>
        <Text fontWeight={"semibold"}>{isText && children}</Text>
      </Flex>
    </Button>
  );
}
