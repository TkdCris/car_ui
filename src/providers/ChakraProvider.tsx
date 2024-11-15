"use client";

import { ColorModeProvider } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";

export const ChakraProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider>
    <ColorModeProvider>{children}</ColorModeProvider>
  </Provider>
);
