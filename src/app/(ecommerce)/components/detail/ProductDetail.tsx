"use client"

import Image from "next/image"
import PageContainer from "../containers/PageContainer"
import Counter from "../general/Counter"
import { useEffect, useState } from "react"
import { Rating } from "@mui/material"
import Button from "../general/Button"
import Comment from "./Comment"
import Heading from "../general/Heading"
import { useDispatch, useSelector } from "react-redux"
import { addToBasket } from "@/redux/Features/cartSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const DetailClient = ({product}: {product: ProductType}) => {
 const dispatch = useDispatch<AppDispatch>();
 const { data: session, status } = useSession();
 const router=useRouter();
    const { cartPrdcts } = useSelector((state: RootState) => state.cart);
 const [displayButton, setDisplayButton] = useState(false)
   const [cardProduct, setCardProduct] = useState<ProductType>({
        _id:product?._id,
        name: product?.name,
        description: product?.description,
        price: product?.price,
        imgUrls: product?.imgUrls,
        inStock: product?.inStock,
        rating: product?.rating,
        brand: product?.brand,
        categoryId: product?.categoryId,
        colors:product?.colors,
        createdAt: product?.createdAt,
        reviews: product?.reviews,
        updatedAt: product?.updatedAt
    })   
  
  useEffect(() => {
    setDisplayButton(false)
    let controlDisplay: any = cartPrdcts?.findIndex(cart => cart._id == product._id)
    if(controlDisplay > -1){
        setDisplayButton(true)
    }
},[cartPrdcts])
    const increaseFunc = () => {
       if(cardProduct.inStock == 10) return
       setCardProduct(prev => ({...prev, quantity: prev.inStock + 1 }))
    }
    const decreaseFunc = () => {
        if(cardProduct.inStock == 1) return
        setCardProduct(prev => ({...prev, quantity: prev.inStock - 1 }))
    }

    let productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length

  return (
    <div className="my-10">
        <PageContainer>
             <div className="block md:flex gap-10 justify-center">
                <div className="relative h-[200px] md:h-[400px] w-[200px] md:w-[400px] mb-3 md:mb-0">
                
                </div>
                <div className="w-full md:w-1/2 space-y-3">
                    <div className="text-xl md:text-2xl">{product?.name}</div>
                    <Rating name="read-only" value={productRating} readOnly />
                    <div className="text-slate-500">{product?.description}</div>
                    <div className="flex items-center gap-2">
                    <div>STOCK STATİON:</div>
                    {
                        product?.inStock ? <div className="text-green-500">Avaliable Product</div> : <div className="text-red-500">Dont avaliable Product</div>
                    }
                </div>
                <div className="text-lg md:text-2xl text-orange-600 font-bold">{product?.price} ₺</div>

                {
                    displayButton ? <>
                     <Button text="Product avaliable in Basket" small outline onClick={() => {}}/>
                    </> : <>
                    <Counter increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} cardProduct={cardProduct}/>
                   <Button text="Add Basket" small onClick={() =>session? dispatch(addToBasket(cardProduct)):router.push("/login")}/>
                    </>
                } </div>  </div>
             <Heading text="Comments"/>
             <div>
                {
                  product?.reviews?  product?.reviews?.map((prd: any,index) => (
                        <Comment key={index} prd={prd}/>
                    )):<div>Ürüne ait yorm bulunmamakta</div>
                }
             </div>
        </PageContainer>
    </div>
  )
}
export default DetailClient