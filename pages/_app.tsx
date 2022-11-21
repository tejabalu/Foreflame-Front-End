import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import "../src/Components/SearchBoxStyles.css";
import theme from "../src/theme";

interface CustomPageProps {}

export default function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
