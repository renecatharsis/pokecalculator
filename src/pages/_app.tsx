import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 pt-12 bg-brand">
                <Component {...pageProps} />
            </main>
            <Footer />
        </>
    );
}
