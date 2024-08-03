import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";

export function LeftContent() {
  return (
    <Flex>
      <HStack
        gap="4"
        alignItems="baseline"
        // textShadow="2px 2px 4px  rgba(58, 5, 107, 0.29)"
      >
        <Heading as="h1" size="md">
          <Text>C.A.R.</Text>
        </Heading>
        <Heading size="sm" display={{ base: "none", md: "flex" }}>
          <Text>Controle Auto Revenda</Text>
        </Heading>
      </HStack>
    </Flex>
  );
}
