"use client";

import {
  ChakraProvider as ChakraProv,
  ColorModeScript,
} from "@chakra-ui/react";
import customTheme from "@/theme";

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProv theme={customTheme}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      {children}
    </ChakraProv>
  );
}
