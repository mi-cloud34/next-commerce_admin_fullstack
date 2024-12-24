
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/app/AuthProvider";
import App from "./App";
import "./globals.css";

import Ap from "./App";

import Footer from "@/components/ECommerce/Footer";
import { ThemeProvider } from "./ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
     <AuthProvider><Ap >
     
      <div>{children}</div></Ap></AuthProvider> 
      </ThemeProvider>
      </body>
    </html>
  
  );
}