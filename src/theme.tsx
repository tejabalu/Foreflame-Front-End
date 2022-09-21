import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: `Noto Sans, ${base.fonts?.heading} `,
    body: `Noto Sans, ${base.fonts.body} `,
  },
  colors: {
    white: "#FFFFFF",
    orange: "#FF5500",
    lightgreen: "#FFF3AD",
    green: "#6BA03D",
    darkgreen: "#021C11",
  },
});

export default theme;
