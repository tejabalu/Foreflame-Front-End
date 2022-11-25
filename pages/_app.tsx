import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import "../src/Components/SearchBoxStyles.css";
import { app, auth, db } from "../src/firebase-config";
import { UserProvider } from "../src/LoginContext";
import theme from "../src/theme";

console.log(app, auth, db);

interface CustomPageProps {}

export default function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}
