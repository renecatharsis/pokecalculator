import React from "react";
import "@/styles/globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Header />
                <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 pt-12 bg-brand">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
