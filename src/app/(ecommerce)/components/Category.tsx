"use client"

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface CategoryData{
    _id: string;
    name: string;
    imgUrl: string;
}
const Category = () => {
  const router=useRouter()
   const [categories,setCategories]=useState<CategoryData[]>([]);
   useEffect(()=>{
const getCategory=async()=>{
  await axios.get( "/api/get_category").then(response=>{
    console.log("category: " + response);
    
    setCategories(response.data);
  }).catch((e)=>{
    console.log(e);
    
  }
);
}

getCategory();
   },[])
   if (categories.length==0) {
    return <div>not found category</div>
   }
   const handleCategoryClick = (categoryId: string) => {
    router.push(`?categoryId=${categoryId}`);
  };
 /*  const handleCategoryClick = (categoryName: string) => {
    const category = categoryPushList.find((cat) => cat.name === categoryName);
    if (category) {
      router.push(`/category/${category.urlName}`);
    }
  }; */
  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-scroll">
        {/* Render the categories twice to create the seamless effect */}
        {categories.concat(categories).map((category, index) => (
          <div
            className="flex-shrink-0 w-[250px] h-[250px] flex flex-col items-center justify-center cursor-pointer px-4 py-2 text-center"
            key={index}
            onClick={() => handleCategoryClick(category._id)}
          >
            <div>{category.name}</div>
            <Image src={category.imgUrl} alt={category.name} width={200} height={75} objectFit="cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category