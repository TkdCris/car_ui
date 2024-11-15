import { Flex, Heading, HStack, Text } from "@chakra-ui/react";

export function LeftContent() {
  return (
    <Flex>
      <HStack gap="4" alignItems="baseline">
        <Heading as="h1" size="xl">
          <Text fontFamily="Nasalization" fontWeight="medium">
            C.A.R.
          </Text>
        </Heading>
        <Heading
          size="md"
          display={{ base: "none", md: "flex" }}
          fontWeight={"bold"}
        >
          <Text>Controle Auto Revenda</Text>
        </Heading>
      </HStack>
    </Flex>
  );
}
