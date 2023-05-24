import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Monoton&family=Noto+Sans+KR:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src={`${process.env.NEXT_PUBLIC_KAKAO_MAP_URI}`}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  )
}
