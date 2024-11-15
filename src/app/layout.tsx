import type { Metadata } from "next";

import { QueryClientProviders } from "@/providers";
import { Provider } from "@/components/ui/provider";
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
          <Provider>{children}</Provider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
