import { GlobalStyles } from "@/styles/theme/Global.styles";
import { globalTheme } from "@/styles/theme/globalTheme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import ApolloSetting from "src/commons/apollo";
import Layout from "src/commons/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <ThemeProvider theme={globalTheme}>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloSetting>
    </RecoilRoot>
  );
}
