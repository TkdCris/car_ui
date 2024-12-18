"use client";

import { GiExitDoor, GiHamburgerMenu } from "react-icons/gi";
import { ImPrinter } from "react-icons/im";
import { RiPagesLine } from "react-icons/ri";
import {
  BsCurrencyDollar,
  BsFillCarFrontFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { deleteCookie } from "@/utils/handleCookies";
import { BtnMenu } from "../BtnMenu";

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
      transition="width 0.3s ease-in-out"
      w={{ base: isMenuText ? 150 : 0, md: isMenuText ? 200 : 14 }}
      h="full"
      justifyContent="space-between"
      color="text"
      bg="menu.bg"
      alignItems="start"
      borderTop={1}
      borderStyle="solid"
      borderColor="app.bg"
    >
      <VStack width="100%" pt={4}>
        <Box w={"100%"} alignItems={"start"}>
          <Link href="/person" passHref={true}>
            <BtnMenu
              isSelected={selected === "person"}
              props={{
                onClick: () => handleSetSelected("person"),
              }}
              icon={<BsFillPersonFill />}
              isText={isMenuText}
            >
              <Text>Pessoas</Text>
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/vehicle" passHref={true}>
            <BtnMenu
              isSelected={selected === "vehicle"}
              props={{ onClick: () => handleSetSelected("vehicle") }}
              icon={<BsFillCarFrontFill />}
              isText={isMenuText}
            >
              <Text>Veículos</Text>
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/financial" passHref={true}>
            <BtnMenu
              isSelected={selected === "financial"}
              props={{ onClick: () => handleSetSelected("financial") }}
              icon={<BsCurrencyDollar />}
              isText={isMenuText}
            >
              <Text>Financeiro</Text>
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/fiscal" passHref={true}>
            <BtnMenu
              isSelected={selected === "fiscal"}
              props={{ onClick: () => handleSetSelected("fiscal") }}
              icon={<RiPagesLine />}
              isText={isMenuText}
            >
              <Text>Notas Fiscais</Text>
            </BtnMenu>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="#" passHref={true}>
            <BtnMenu
              isSelected={selected === "reports"}
              props={{ onClick: () => handleSetSelected("reports") }}
              icon={<ImPrinter />}
              isText={isMenuText}
            >
              <Text>Relatórios</Text>
            </BtnMenu>
          </Link>
        </Box>
      </VStack>

      <Flex w={"100%"} borderTop={1} borderStyle="solid" borderColor="app.bg">
        <BtnMenu
          props={{ onClick: handleSignOut }}
          icon={<GiExitDoor />}
          isText={isMenuText}
        >
          <Text>Sair</Text>
        </BtnMenu>
      </Flex>
    </VStack>
  );
}
