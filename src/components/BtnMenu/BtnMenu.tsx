import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { Flex, Icon, Text } from "@chakra-ui/react";

interface BtnMenuProps {
  children?: React.ReactNode;
  isSelected?: boolean;
  icon?: React.ReactNode;
  isText?: boolean;
  props: ButtonProps;
}

export function BtnMenu({
  icon,
  children,
  isSelected,
  isText,
  props,
}: BtnMenuProps) {
  return (
    <Button
      variant={"ghost"}
      h={8}
      w={"100%"}
      cursor="pointer"
      _hover={{
        transition: "background-color 0.2s",
        bg: "rgba(255, 255, 255, 0.1)",
      }}
      rounded={0}
      borderRight={isSelected && isText ? 4 : 0}
      borderStyle={"solid"}
      borderRightColor="menu.border_detail"
      bg={isSelected ? "rgba(255, 255, 255, 0.1)" : ""}
      transition="0.3s ease-in-out"
      justifyContent={"start"}
      color="menu.text"
      zIndex={0}
      {...props}
    >
      <Flex alignItems={"center"} gap={4}>
        <Icon>{icon}</Icon>
        <Text fontWeight={"semibold"}>{isText && children}</Text>
      </Flex>
    </Button>
  );
}
