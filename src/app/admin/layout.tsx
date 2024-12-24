import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardWrapper from "./dashboardWrapper";
import { Toaster } from "react-hot-toast";
import App from "../App";

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
      <Toaster
            position="top-right"
            reverseOrder={false}
          />
   <DashboardWrapper> {children}</DashboardWrapper>  
      </body>
    </html>
  );
}