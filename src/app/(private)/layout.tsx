import { Box, Flex, HStack } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import React from "react";

import { LeftMenu, MainHeader } from "@/compoments";
import { useSession } from "@/hooks/useSession";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await useSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <Flex direction="column" height="100vh" px={{ base: "0", "2xl": "50" }}>
      <Box as="header" bg="header.bg">
        <MainHeader />
      </Box>
      <Box as="main" flex="1" bg="app_bg">
        <HStack height="100%" gap={0}>
          <Box height="100%" width={250} display={{ base: "none", md: "flex" }}>
            <LeftMenu />
          </Box>
          <Box
            height="100%"
            width="full"
            maxHeight="calc(100vh - 57px)"
            overflowY="auto"
            color={"content.text"}
          >
            {children}
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
}
