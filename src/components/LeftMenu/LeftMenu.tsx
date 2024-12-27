"use client";

import { GiExitDoor } from "react-icons/gi";
import { ImPrinter } from "react-icons/im";
import { RiPagesLine } from "react-icons/ri";
import {
  BsCurrencyDollar,
  BsFillCarFrontFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { Box, Flex, useBreakpointValue, VStack } from "@chakra-ui/react";
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

  const handleSignOut = () => {
    deleteCookie("token");
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  const breakPoint = useBreakpointValue({
    base: "base",
    md: "md",
  });

  const handleSetSelected = (value: string) => {
    setSelected(value);
    if (breakPoint === "base") toogleMenu();
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
            <BtnMenu.Root
              isSelected={selected === "person"}
              isText={isMenuText}
              onClick={() => {
                handleSetSelected("person");
              }}
            >
              <BtnMenu.Icon icon={<BsFillPersonFill />} />
              <BtnMenu.Text isText={isMenuText}>Pessoas</BtnMenu.Text>
            </BtnMenu.Root>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/vehicle" passHref={true}>
            <BtnMenu.Root
              isSelected={selected === "vehicle"}
              isText={isMenuText}
              onClick={() => handleSetSelected("vehicle")}
            >
              <BtnMenu.Icon icon={<BsFillCarFrontFill />} />
              <BtnMenu.Text isText={isMenuText}>Veículos</BtnMenu.Text>
            </BtnMenu.Root>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/financial" passHref={true}>
            <BtnMenu.Root
              isSelected={selected === "financial"}
              isText={isMenuText}
              onClick={() => handleSetSelected("financial")}
            >
              <BtnMenu.Icon icon={<BsCurrencyDollar />} />
              <BtnMenu.Text isText={isMenuText}>Financeiro</BtnMenu.Text>
            </BtnMenu.Root>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="/fiscal" passHref={true}>
            <BtnMenu.Root
              isSelected={selected === "fiscal"}
              isText={isMenuText}
              onClick={() => handleSetSelected("fiscal")}
            >
              <BtnMenu.Icon icon={<RiPagesLine />} />
              <BtnMenu.Text isText={isMenuText}>Notas Fiscais</BtnMenu.Text>
            </BtnMenu.Root>
          </Link>
        </Box>
        <Box w={"100%"}>
          <Link href="#" passHref={true}>
            <BtnMenu.Root
              isSelected={selected === "reports"}
              isText={isMenuText}
              onClick={() => handleSetSelected("reports")}
            >
              <BtnMenu.Icon icon={<ImPrinter />} />
              <BtnMenu.Text isText={isMenuText}>Relatórios</BtnMenu.Text>
            </BtnMenu.Root>
          </Link>
        </Box>
      </VStack>

      <Flex w={"100%"} borderTop={1} borderStyle="solid" borderColor="app.bg">
        <BtnMenu.Root
          isSelected={selected === "vehicle"}
          isText={isMenuText}
          onClick={handleSignOut}
        >
          <BtnMenu.Icon icon={<GiExitDoor />} />
          <BtnMenu.Text isText={isMenuText}>Sair</BtnMenu.Text>
        </BtnMenu.Root>
      </Flex>
    </VStack>
  );
}
