"use client";

import { signOut } from "next-auth/react";
import { GiExitDoor } from "react-icons/gi";
import { ImPrinter } from "react-icons/im";
import { RiPagesLine } from "react-icons/ri";
import { BsFillCarFrontFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

import { BtnMenu } from "../BtnMenu";

export function LeftMenu() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSetSelected = (e: string) => {
    setSelected(e);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <VStack
      w="full"
      h="full"
      justifyContent="space-between"
      color="text"
      bg="header.bg"
      alignItems="start"
      borderTop={1}
      borderStyle="solid"
      borderColor="app_bg"
    >
      <VStack width="100%" alignItems="start" pt={4}>
        <Box pl={4}>Menu</Box>
        <Box w={"100%"}>
          <Link href="/person" passHref={true}>
            <BtnMenu
              isSelected={selected === "person"}
              onClick={() => handleSetSelected("person")}
            >
              <BsFillPersonFill />
              Pessoas
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/vehicle" passHref={true}>
            <BtnMenu
              isSelected={selected === "vehicle"}
              onClick={() => handleSetSelected("vehicle")}
            >
              <BsFillCarFrontFill />
              Veículos
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/financial" passHref={true}>
            <BtnMenu
              isSelected={selected === "financial"}
              onClick={() => handleSetSelected("financial")}
            >
              <BsCurrencyDollar />
              Financeiro
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/fiscal" passHref={true}>
            <BtnMenu
              isSelected={selected === "fiscal"}
              onClick={() => handleSetSelected("fiscal")}
            >
              <RiPagesLine />
              Notas Fiscais
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="#" passHref={true}>
            <BtnMenu
              isSelected={selected === "reports"}
              onClick={() => handleSetSelected("reports")}
            >
              <ImPrinter />
              Relatórios
            </BtnMenu>
          </Link>
        </Box>
      </VStack>

      <Flex w={"100%"} borderTop={1} borderStyle="solid" borderColor="app_bg">
        <Flex px={8} py={2} alignItems="center" gap={4}>
          <GiExitDoor />
          <Button color="text" variant="link" onClick={handleSignOut}>
            Sair
          </Button>
        </Flex>
      </Flex>
    </VStack>
  );
}
