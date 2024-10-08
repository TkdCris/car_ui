import type { Metadata } from "next";
import { Box, Flex, HStack } from "@chakra-ui/react";

import { ChakraProvider } from "@/providers/ChakraProvider";
import { LeftMenu, MainHeader } from "@/compoments";
import { fonts } from "./fonts";
import "@/global.css";

export const metadata: Metadata = {
  title: "C.A.R.",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fonts.rubik.variable}`}>
      <body>
        <ChakraProvider>
          <Flex
            direction="column"
            height="100vh"
            px={{ base: "0", "2xl": "50" }}
          >
            <Box as="header" bg="header.bg">
              <MainHeader />
            </Box>
            <Box as="main" flex="1" bg="app_bg">
              <HStack height="100%" gap={0}>
                <Box
                  height="100%"
                  width={250}
                  display={{ base: "none", md: "flex" }}
                >
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
        </ChakraProvider>
      </body>
    </html>
  );
}
