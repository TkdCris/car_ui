import { Box, BoxProps, HStack } from "@chakra-ui/react";

interface ContentHeaderProps extends BoxProps {
  title?: string;
}

export function ContentHeader({ title, ...rest }: ContentHeaderProps) {
  return (
    <HStack
      w="full"
      h={8}
      px={8}
      bg="content.header"
      color={"content.text"}
      {...rest}
    >
      <Box>{title}</Box>
    </HStack>
  );
}
