import type { Metadata } from "next";
import { ChakraProvider } from "./providers/ChakraProvider";
import { fonts } from "./fonts";
import "./globals.css";

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
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
