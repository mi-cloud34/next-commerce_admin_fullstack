"use client"
import adminStore from "@/redux/adminStore";
//import StoreProvider from "@/redux";
import React from "react"
import { Provider } from "react-redux";

const App=({children}:{children:React.ReactNode})=>{
    return <Provider store={adminStore}>{children}</Provider>

   /*  <StoreProvider>
         
         {children}
        
        </StoreProvider> */
    
};
export default App;