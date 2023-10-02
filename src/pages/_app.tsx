import "@/styles/globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 pt-12">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
