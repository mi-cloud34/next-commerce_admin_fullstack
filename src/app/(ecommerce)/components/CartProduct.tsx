"use client";
import { removeFromCart } from '@/redux/Features/cartSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx';
interface CartProductProps {
    product: ProductType; // Tekil ürün props'u
}

const CartProduct = ({ product }: CartProductProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product)); // Ürünü sepetten kaldırıyoruz
        toast.success('Ürün Sepetten Silindi...');
    };

    return (
        <div className="flex items-center justify-between gap-4 border-b pb-4 mb-4">
            {/* Ürün Resmi */}
            <Image height={80} width={80} src={"/hero.jpg"} alt={product.name} />
    
            {/* Ürün Bilgileri */}
            <div className="flex flex-col">
                <div className="text-lg font-medium">{product.name}</div>
                <div className="text-gray-600 text-center">${product.price}</div>
            </div>
    
            {/* Silme Butonu */}
            <button
    className="w-12 h-8 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
    onClick={handleRemoveFromCart}
>
    <RxCross1 />
</button>

        </div>
    );
    
    
};

export default CartProduct;
