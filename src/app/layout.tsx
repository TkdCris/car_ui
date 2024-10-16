import type { Metadata } from "next";

import { ChakraProvider, QueryClientProviders } from "@/providers";
import { fonts } from "./fonts";
import "@/global.css";

export const metadata: Metadata = {
  title: "Controle Auto Revenda",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fonts.rubik.variable}`}>
      <body>
        <QueryClientProviders>
          <ChakraProvider>{children}</ChakraProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
