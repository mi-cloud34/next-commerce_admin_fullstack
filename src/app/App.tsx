
"use client"
import { store } from "@/redux/store";
//import StoreProvider from "@/redux";
import React from "react"
import { Provider } from "react-redux";
const Ap=({children}:{children:React.ReactNode})=>{
    return  <Provider store={store}>{children}</Provider>

   /*  <StoreProvider>
         
         {children}
        
        </StoreProvider> */
    
};
export default Ap;