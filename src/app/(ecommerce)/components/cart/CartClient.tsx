"use client"

import PageContainer from "../containers/PageContainer"
import Image from "next/image"
import Button from "../general/Button"
import { CardProductProps } from "../detail/ProductDetail"
import Counter from "../general/Counter"

import { addToBasketDecrease, addToBasketIncrease, removeCart, removeFromCart } from "@/redux/Features/cartSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"

const CartClient = () => {
    const { cartPrdcts, productCartQty } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
   // const {cartPrdcts, removeFromCart,removeCart,addToBasketIncrease,addToBasketDecrease} = UseCart()

    console.log(cartPrdcts, "cartPrdcts")
    if(!cartPrdcts || cartPrdcts.length == 0){
        return <div>Sepetinizde ürün bulunmamaktadır...</div>
    }

    let cartPrdctsTotal = cartPrdcts.reduce((acc: any, item:CardProductProps) => acc + item.quantity * item.price,0)
  return (
    <div className="my-3 md:my-10">
        <PageContainer>
            <div className="flex items-center gap-3 text-center border-b py-3">
                 <div className="w-1/5">Ürün Resmi</div>
                 <div className="w-1/5">Ürün Adı</div>
                 <div className="w-1/5">Ürün Miktarı</div>
                 <div className="w-1/5">Ürün Fiyatı</div>
                 <div className="w-1/5"></div>
            </div>
            <div>
                {
                    cartPrdcts.map(cart => (
                        <div className="flex items-center justify-between text-center my-5" key={cart.id}>
                            <div className="w-1/5 flex items-center justify-center">
                               <Image src={cart.img} width={40} height={40} alt=""/>
                            </div>
                            <div className="w-1/5">{cart.name}</div>
                            <div className="w-1/5 flex justify-center">
                                <Counter cardProduct={cart} increaseFunc={() =>dispatch( addToBasketIncrease(cart))} decreaseFunc={() =>dispatch( addToBasketDecrease(cart))}/>
                            </div>
                            <div className="w-1/5 text-orange-600 text-lg">{cart.price} ₺</div>
                            <div className="w-1/5">
                                <Button text="Ürünü Sil" small onClick={() =>dispatch( removeFromCart(cart))}/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center justify-between my-5 py-5 border-t">
                <button onClick={() =>dispatch(removeCart())} className="w-1/5 underline text-sm">Sepeti Sil</button>
                <div className="text-lg md:text-2xl text-orange-600 font-bold">{cartPrdctsTotal} ₺</div>
            </div>
        </PageContainer>
    </div>
  )
}

export default CartClient