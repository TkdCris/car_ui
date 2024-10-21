"use client";

import { GiExitDoor } from "react-icons/gi";
import { ImPrinter } from "react-icons/im";
import { RiPagesLine } from "react-icons/ri";
import {
  BsCurrencyDollar,
  BsFillCarFrontFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { BtnMenu } from "../BtnMenu";
import { deleteCookie } from "@/utils/handleCookies";

type LeftMenuProps = {
  toogleMenu: () => void;
  isMenuText: boolean;
};

export function LeftMenu({ toogleMenu, isMenuText }: LeftMenuProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const router = useRouter();

  const handleSetSelected = (e: string) => {
    setSelected(e);
  };

  const handleSignOut = () => {
    deleteCookie("token");
    sessionStorage.removeItem("token");
    router.push("/login");
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
      pl={{ base: 0, md: 4 }}
      pr={{ base: 4, md: 8 }}
    >
      <VStack width="100%" alignItems="start" pt={4}>
        <Flex alignItems="center" gap={4} h={8} ml={4} onClick={toogleMenu}>
          <HamburgerIcon />
          <Box
            opacity={isMenuText ? 1 : 0}
            transition="opacity 0.3s ease-in-out"
          >
            Menu
          </Box>
        </Flex>
        <Box w={"100%"} alignItems={"start"}>
          <Link href="/person" passHref={true}>
            <BtnMenu
              isSelected={selected === "person"}
              onClick={() => handleSetSelected("person")}
              icon={<BsFillPersonFill />}
            >
              <Text
                opacity={isMenuText ? 1 : 0}
                transition="opacity 0.3s ease-in-out"
              >
                Pessoas
              </Text>
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/vehicle" passHref={true}>
            <BtnMenu
              isSelected={selected === "vehicle"}
              onClick={() => handleSetSelected("vehicle")}
              icon={<BsFillCarFrontFill />}
            >
              <Text
                opacity={isMenuText ? 1 : 0}
                transition="opacity 0.3s ease-in-out"
              >
                Veículos
              </Text>
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/financial" passHref={true}>
            <BtnMenu
              isSelected={selected === "financial"}
              onClick={() => handleSetSelected("financial")}
              icon={<BsCurrencyDollar />}
            >
              <Text
                opacity={isMenuText ? 1 : 0}
                transition="opacity 0.3s ease-in-out"
              >
                Financeiro
              </Text>
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/fiscal" passHref={true}>
            <BtnMenu
              isSelected={selected === "fiscal"}
              onClick={() => handleSetSelected("fiscal")}
              icon={<RiPagesLine />}
            >
              <Text
                opacity={isMenuText ? 1 : 0}
                transition="opacity 0.3s ease-in-out"
              >
                Notas Fiscais
              </Text>
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="#" passHref={true}>
            <BtnMenu
              isSelected={selected === "reports"}
              onClick={() => handleSetSelected("reports")}
              icon={<ImPrinter />}
            >
              <Text
                opacity={isMenuText ? 1 : 0}
                transition="opacity 0.3s ease-in-out"
              >
                Relatórios
              </Text>
            </BtnMenu>
          </Link>
        </Box>
      </VStack>

      <Flex w={"100%"} borderTop={1} borderStyle="solid" borderColor="app_bg">
        <Flex h={8} pl={4} py={2} alignItems="center">
          <Button color="text" variant="link" gap={4} onClick={handleSignOut}>
            <GiExitDoor />
            <Text
              opacity={isMenuText ? 1 : 0}
              transition="opacity 0.3s ease-in-out"
            >
              Sair
            </Text>
          </Button>
        </Flex>
      </Flex>
    </VStack>
  );
}
