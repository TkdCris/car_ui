import { Box, BoxProps, Button, Flex, HStack } from "@chakra-ui/react";

interface ContentHeaderProps extends BoxProps {
  leftTitle?: string;
  centerTitle?: string;
  btnTitle?: string;
  btnUrl?: string;
  children?: React.ReactNode;
}

export function ContentHeader({
  leftTitle,
  centerTitle,
  children,
}: ContentHeaderProps) {
  return (
    <HStack w="full" h={10} px={4} bg="content.header" color={"content.text"}>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Box fontSize={"lg"} fontWeight={"semibold"}>
          {leftTitle}
        </Box>
        <Box>{centerTitle}</Box>
        <Flex gap={2}>{children}</Flex>
      </HStack>
    </HStack>
  );
}
