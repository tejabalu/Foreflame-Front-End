import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import React, { ReactElement } from "react";

type Props = {};

class Document extends NextDocument<Props> {
  render(): ReactElement {
    return (
      <Html>
        <Head />
        <title>ForeFlame App</title>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
