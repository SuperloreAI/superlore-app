import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "nouislider/dist/nouislider.css";
import "antd/dist/reset.css";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
