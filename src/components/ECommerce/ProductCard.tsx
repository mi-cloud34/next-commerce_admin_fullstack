
"use client"
import Category from '@/app/admin/(dashboard)/category/page';
import { addToBasket } from '@/redux/Features/cartSlice';
import { AppDispatch, RootState} from '@/redux/store';
import { translateText } from '@/utils/translate';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

import { AiFillStar, AiOutlineShoppingCart, AiOutlineStar, } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';

  const ProductCard = ({product}: {product: ProductType})=> {
      const router = useRouter();
      const language = useSelector((state: RootState) => state.language);
      //const [translatedText, setTranslatedText] = useState<string>("");
      const { cartPrdcts, productCartQty } = useSelector((state: RootState) => state.cart);
      const currentUser = useSelector((state:RootState) => state.user.currentUser);
console.log("productID", product);

const imgs=[
  "logo.png"
/*        
  "/flags/en.jpg",
  ,
  "/flags/tr.png",
  
  "/flags/rs.jpg" */
      ]
      const hasmultipleImages = imgs?.length> 1
  const dispatch=useDispatch<AppDispatch>();
  const handleAddToBasket = () => {
    dispatch(addToBasket(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} // Başlangıç durumu (sola kaydırma)
      animate={{ opacity: 1, x: 0 }}   // Animasyon sonunda görünür olma
      transition={{ duration:1, delay: Math.random() * 0.3 }} // Rastgele gecikme
      className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800"
    >   {/* Product Image */}
       {/* Product Image */}
{/*   <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
    <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
      New
    </div>
  </div> */}
  <Carousel
    plugins={[
      Autoplay({
        delay: 2000,
      }),
    ]}
    opts={{
      align: "start",
      loop: true,
    }}
  >
    <CarouselContent>
      {imgs?.map((image, index) => (
        <CarouselItem key={index}>
           <Image
             
              width={500}
              alt='alt'
              height={700}
              unoptimized={true}
              src={
              image.toString()
              }
              className='rounded-3xl scale-95 w-full object-cover group-hover:scale-100 transition-all duration-700'
            />

        </CarouselItem>
      ))}
    </CarouselContent>
    {hasmultipleImages && <CarouselPrevious className='left-0' />}
    {hasmultipleImages && <CarouselNext className='right-0' />}
  </Carousel>

  {/* Product Details */}
  <div className="p-5">
    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500 transition duration-300">
      {product.name}
    </h3>
    <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
    <div className="flex items-center mt-2">
      <span className="text-xl font-bold text-gray-800">${product.price}</span>
      <span className="text-gray-400 ml-2 line-through">${product.price + 20}</span>
    </div>

    {/* Rating */}
    <div className="flex items-center mt-3 text-[#FFB21D]">
      {[...Array(5)].map((_, i) => (
        i < product.rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
      ))}
      <p className="text-gray-600 text-sm ml-2">{`(${product.rating})`}</p>
    </div>

    {/* Add to Basket Button */}
    <div className='flex justify-between gap-x-20'>
    <button
      onClick={() => handleAddToBasket()}
      className="cursor-pointer w-full mt-4 bg-blue-500 text-white flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium shadow-md hover:bg-blue-600 transition duration-300"
    >
      <AiOutlineShoppingCart size={25} />
   
    </button>
    <button
     onClick={() => router.push(`product/${product._id}`)} 
      className="cursor-pointer w-full mt-4 bg-blue-500 text-white flex items-center justify-center gap-2 py-2 rounded-md text-xl font-medium shadow-md hover:bg-blue-600 transition duration-300"
    >
     
     Detail
    </button>
    </div>
  </div>
    </motion.div>
  );
}

export default ProductCard