import { Text } from "@chakra-ui/react";

interface BtnTextProps {
  children?: React.ReactNode;
  isText?: boolean;
}

export function BtnText({ children, isText }: BtnTextProps) {
  return <Text fontWeight={"semibold"}>{isText && children}</Text>;
}
