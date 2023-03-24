import { GlobalStyles } from "@/styles/theme/Global.styles";
import { globalTheme } from "@/styles/theme/globalTheme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Layout from "src/commons/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
