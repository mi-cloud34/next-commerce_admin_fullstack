"use client";

import React, { useEffect } from "react";
import Sidebar from "./(components)/Sidebar";
import Navbar from "./(components)/Navbar";
import { Provider, useSelector } from "react-redux";
import { RootState } from "@/redux";
import adminStore from "@/redux/adminStore";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useSelector(
    (state:RootState) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useSelector((state:RootState) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
   <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        
       {children}
      </main>
    </div>
   
  );
};
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={adminStore} > <DashboardLayout>{children}</DashboardLayout>
      </Provider>
     
  );
};

export default  DashboardWrapper;