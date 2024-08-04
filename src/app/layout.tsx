import { Box, Flex, HStack } from "@chakra-ui/react";
import type { Metadata } from "next";

import { Header } from "@/compoments/Header";
import { LeftMenu } from "@/compoments/LeftMenu/LeftMenu";
import { ChakraProvider } from "@/providers/ChakraProvider";
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
              <Header />
            </Box>
            <Box as="main" flex="1" overflow="auto">
              <HStack height="100%" gap={0}>
                <Box
                  height="100%"
                  width={250}
                  display={{ base: "none", md: "flex" }}
                >
                  <LeftMenu />
                </Box>
                <Box bg="app_bg" height="100%" width="100%">
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
