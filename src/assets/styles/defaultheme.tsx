import { ThemeProvider } from "styled-components";
import React from "react";

const theme = {
  colors: {
    primary: "rgb(9, 9, 10)",
    secondary: "rgb(130, 52, 233)",
    white: "white",
    third: "rgb(196, 196, 204)",
    fourth: "#b5b5b5",
    fifith: "rgb(32, 32, 36)",
    secondarydark: "#1b003a",
  },
};
export function DefaulTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
