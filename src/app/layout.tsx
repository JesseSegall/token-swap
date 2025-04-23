
import ReactQueryProvider from "@/components/ReactQueryProvider";
import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
        </body>
        </html>
    );
}
