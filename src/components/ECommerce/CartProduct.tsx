"use client"
import { removeFromCart, setProductCartQty } from '@/redux/Features/cartSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import React from 'react'
import toast from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';


const CartProduct = ({products}:{products:ProductType[]}) => {
    const { cartPrdcts } = useSelector((state: RootState) => state.cart);

    const dispatch =useDispatch<AppDispatch>();
    const handleRemoveFromCart = (product: ProductType) => {
        dispatch(removeFromCart(product)); // Ürünü sepetten kaldırıyoruz
        dispatch(setProductCartQty()); // Ürün sayısını güncelliyoruz
      
       
        toast.success('Ürün Sepetten Silindi...');
        localStorage.setItem('cart', JSON.stringify(cartPrdcts));
      };
  return (
    <div className='flex justify-between items-center'>
        {
            products.map((product, index) => (
                <div key={index} className='flex items-center gap-4'>
                    <Image height={80} width={80} src={product.imgUrls[0]} alt={product.name} />
                    <div className='space-y-2'>
                        <div>{product.name}</div>
                        <div>{product.price}</div>
                    </div>
                    <button className='w-12 h-8 bg-red-500 text-white rounded-md hover:bg-red-600' onClick={() => handleRemoveFromCart(product)}>
                        <RxCross1 />
                    </button>
                </div>
            ))
        }
    </div>
  )
}

export default CartProduct