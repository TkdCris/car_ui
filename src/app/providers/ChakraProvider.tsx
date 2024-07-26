"use client";

import { ChakraProvider as ChakraProv } from "@chakra-ui/react";

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProv>{children}</ChakraProv>;
}
