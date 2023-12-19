import Layout from "@/components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useEffect } from "react";

//main css
import { SettlProvider } from "@/context/context";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Head>
          <title>
            Settl
          </title>
          <meta name="description" content="Settl - Paga tus tarjetas a tiempo" />
          <link rel="icon" href="favicon.ico" />
        </Head>
        <SettlProvider>
          <Component {...pageProps} />
        </SettlProvider>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
        Settl
        </title>
        <meta name="description" content="Settl - Paga tus tarjetas a tiempo" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <SettlProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettlProvider>
    </>
  );
}
