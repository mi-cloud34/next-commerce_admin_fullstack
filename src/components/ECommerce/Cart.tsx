"use client"
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import CartProduct from './CartProduct';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState, useEffect, Dispatch, SetStateAction } from "react";
interface CartProps {
    setShowCart: Dispatch<SetStateAction<boolean>>;
  }
const Cart = ({setShowCart}:CartProps) => {
    const products=useSelector((state:RootState)=>state.cart.cartPrdcts);
    const getTotal=()=>{
        let total=0;
        products?.forEach((item:any)=>(total=total+item.price*item.inStock));
        return total;
    }
    const handleCartClick = () => {
        console.log("sepet kapandııııııııııııııııııııııı");
        
        setShowCart(false); // Sepet açma fonksiyonu
      };
    //let cartPrdctsTotal = products.reduce((acc: any, item) => acc + item.inStock * item.price,0)
  return (
    <div className=' w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-scroll'>
        <div className='max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6'>
            <RxCross1
            className='absolute right-0 top-0 m-6 text-[24px] cursor-pointer'
            onClick={() => handleCartClick()}/>
            <h3 className='pt-6 text-lg font-medium text-gray-600 uppercase'>Your Cart</h3>
            <div className='mt-6 space-y-2'>
                {
                    products?.map((item)=>(
                        <CartProduct 
                       products={products}
                        />
                    ))
                }
            </div>
            <div className='flex justify-between items-center font-medium text-xl py-4'>
                <p>Total:</p>
                <p>${getTotal()}.00</p>
           </div>
           <button className='bg-black text-white text-center w-full rounded-3xl py-2
           hover:bg-accent mb-4 mt-4
           '>View Cart</button>
             <button className='bg-black text-white text-center w-full rounded-3xl py-2
           hover:bg-accent mb-4 mt-4
           '>CheckOut</button>
        </div>
    </div>
  )
}

export default Cart