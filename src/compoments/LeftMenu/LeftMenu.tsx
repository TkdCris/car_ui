"use client";

import { Box, Flex, VStack } from "@chakra-ui/react";

export function LeftMenu() {
  return (
    <VStack
      w="full"
      h="full"
      justifyContent="space-between"
      color="header.text"
      bg="header.bg"
      alignItems="start"
      borderTop={1}
      borderStyle="solid"
      borderColor="header.text"
    >
      <VStack width="100%" alignItems="start" px={8} pt={4}>
        <Box>Pessoa</Box>
        <Box>Veículos</Box>
        <Box>Financeiro</Box>
        <Box>Notas Fiscais</Box>
        <Box>Relatórios</Box>
      </VStack>

      <Flex
        w={"100%"}
        borderTop={1}
        borderStyle="solid"
        borderColor="header.text"
      >
        <Box px={8} py={2}>
          Sair
        </Box>
      </Flex>
    </VStack>
  );
}
