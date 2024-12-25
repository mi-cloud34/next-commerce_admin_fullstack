"use client";
import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import CartProduct from './CartProduct';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Dispatch, SetStateAction } from "react";

interface CartProps {
    setShowCart: Dispatch<SetStateAction<boolean>>;
}

const Cart = ({ setShowCart }: CartProps) => {
    const products = useSelector((state: RootState) => state.cart.cartPrdcts);

    const getTotal = () => {
        return products?.reduce((total, item) => total + item.price * item.inStock, 0) || 0;
    };

    const handleCartClick = () => {
        setShowCart(false); // Sepeti kapatma fonksiyonu
    };

    return (
        <div className='w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-scroll'>
            <div className='max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6'>
                <RxCross1
                    className='absolute right-0 top-0 m-6 text-[24px] cursor-pointer'
                    onClick={handleCartClick}
                />
                <h3 className='pt-6 text-lg font-medium text-gray-600 uppercase'>Your Cart</h3>
                <div className='mt-6 space-y-2'>
                    {
                        products?.map((item, index) => (
                            <CartProduct
                                key={item._id || index}
                                product={item} // Her bir ürünü tekil olarak geçiriyoruz
                            />
                        ))
                    }
                </div>
                <div className='flex justify-between items-center font-medium text-xl py-4'>
                    <p>Total:</p>
                    <p>${getTotal()}.00</p>
                </div>
                <button className='bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mb-4 mt-4'>
                    CheckOut
                </button>
            </div>
        </div>
    );
};

export default Cart;
