import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Button, ButtonProps } from "../ui/button";

interface BtnMenuRootProps extends ButtonProps {
  isSelected?: boolean;
  isText?: boolean;
  children?: React.ReactNode;
}

export function BtnMenuRoot({
  isSelected,
  isText,
  children,
  ...props
}: BtnMenuRootProps) {
  const borderRight = useBreakpointValue({
    base: "0px",
    md: isSelected ? "4px" : "0px",
  });
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
      borderRight={borderRight}
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
        {children}
      </Flex>
    </Button>
  );
}
