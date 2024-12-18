import { Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { BtnMenu } from "../BtnMenu";
import { GiHamburgerMenu } from "react-icons/gi";

interface LeftContentProps {
  toogleMenu: () => void;
}

export function LeftContent({ toogleMenu }: LeftContentProps) {
  return (
    <Flex>
      <HStack gap="4" alignItems="center">
        <BtnMenu
          props={{
            w: 10,
            h: 4,
            onClick: toogleMenu,
            _hover: {
              bg: "rgba(255, 255, 255, 0)",
            },
          }}
          icon={<GiHamburgerMenu />}
        />
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
