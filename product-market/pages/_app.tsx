import { GlobalStyles } from "@/styles/Global.styles";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={style}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
