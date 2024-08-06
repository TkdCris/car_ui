import { Button, Flex } from "@chakra-ui/react";

interface BtnMenuProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export function BtnMenu({ children, isSelected, onClick }: BtnMenuProps) {
  return (
    <Button
      variant={"unstyled"}
      h={7}
      pl={8}
      cursor="pointer"
      _hover={{
        transition: "background-color 0.2s",
        bg: "rgba(255, 255, 255, 0.1)",
      }}
      w={"100%"}
      rounded={0}
      borderRight={isSelected ? 4 : 0}
      borderStyle={"solid"}
      borderColor={isSelected ? "green_detail" : "header.text"}
      bg={isSelected ? "rgba(255, 255, 255, 0.1)" : ""}
      onClick={onClick}
    >
      <Flex alignItems="center" gap={4}>
        {children}
      </Flex>
    </Button>
  );
}
