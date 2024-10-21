"use client";

import { Box, Flex, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { redirect } from "next/navigation";

import { LeftMenu, MainHeader } from "@/compoments";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuText, setIsMenuText] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMenuText(false); // Largura menor que "md"
      } else {
        setIsMenuText(true); // Largura maior ou igual a "md"
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toogleMenu = () => {
    setIsMenuText((prev) => !prev);
  };

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (!sessionToken) redirect("/login");
  }, []);

  return (
    <Flex direction="column" height="100vh">
      <Box as="header" bg="header.bg">
        <MainHeader />
      </Box>
      <Box as="main" flex="1" bg="app_bg">
        <HStack height="100%" gap={0}>
          <Box
            transition="width 0.3s ease-in-out"
            height="100%"
            width={isMenuText ? 240 : 12}
          >
            <LeftMenu toogleMenu={toogleMenu} isMenuText={isMenuText} />
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
