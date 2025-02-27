
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/app/AuthProvider";
import App from "./App";
import "./globals.css";
import Ap from "./App";

import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "react-hot-toast";
import NavBar from "./(ecommerce)/components/Navbar";
import Footer from "./(ecommerce)/components/Footer";

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
      <body className="min-h-screen flex flex-col">
      <Toaster
            position="top-right"
            reverseOrder={false}
          />
     <AuthProvider><Ap >
    
     <div className="fixed top-0 left-0 w-full z-50 shadow-md">
          <NavBar />
        </div>
      <div className="flex-grow mt-[64px]">{children}</div>
      
          <Footer />
       
      </Ap></AuthProvider> 
      
      </body>
    </html>
  
  );
}
