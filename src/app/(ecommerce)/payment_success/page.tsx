"use client"

import Link from "next/link";
import { useEffect } from "react";
import { removeCart, removeFromCart } from '@/redux/Features/cartSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
const SuccessfulPayment = () => {
 
   const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(removeCart()); 
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <p className="text-heading4-bold text-red-1">Successful Payment</p>
      <p>Thank you for your purchase</p>
      <Link
        href="/"
        className="p-4 border text-base-bold border-r-4 bg-green-600 hover:bg-indigo-400 hover:text-white"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
