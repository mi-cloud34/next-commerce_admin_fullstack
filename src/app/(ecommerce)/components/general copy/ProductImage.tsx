import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';


interface ProductImagesProps{
    images:[string];
}

const ProductImages = () => {

  /*   const hasmultipleImages = images?.length> 1;
    console.log("imageeeeeeeeeeee",images); */
    const imgs=[
       
"/flags/en.jpg",
,
"/flags/tr.png",

"/flags/en.jpg"
    ]
    const hasmultipleImages = imgs?.length> 1
  return (
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
    {imgs?.map((image, index)=>(

        <CarouselItem key={index}>
             <Image
                width={500}  // Fixed width
                height={600}  
                src={String(image)}
              alt='alt'
            
             
             
              className='rounded-3xl scale-95 w-full group-hover:scale-100 transition-all duration-700'
            />


        </CarouselItem>    
    ))}
 

 
   
  </CarouselContent>
  {hasmultipleImages && <CarouselPrevious className='left-0' />}
  {hasmultipleImages && <CarouselNext className='right-0' />}
</Carousel>
  )
}

export default ProductImages