"use client";


import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useSession } from "next-auth/react";
import axios from "axios";
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import { addToBasketIncrease, removeFromCart } from "@/redux/Features/cartSlice";

const CartClient = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const cartItems = useSelector((state: RootState) => state.cart.cartPrdcts);
   
  const total =cartItems?.reduce((total, item) => total + item.price * item.inStock, 0) || 0;
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    id: currentUser?.data?.id,
    email: currentUser?.data.email,
    name: currentUser?.data?.name,
  };
console.log("currentUserCarttttttt", currentUser);

  const handleCheckout = async () => {
    try {
      if (!currentUser) {
        router.push("/login");
      } else {
        console.log("carts55555", cartItems);
        
        const res = await axios.post( "/api/checkout",{cartItems,customer});
        const data = await res.data;
        window.location.href = data.url;
        console.log(data);
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cartItems.map((cartItem) => (
              <div className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between">
                <div className="flex items-center">
                  <Image
                    src={cartItem.imgUrls[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.description}</p>
                   {/*  {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )} */}
                    <p className="text-small-medium">${cartItem.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() =>  dispatch(addToBasketIncrease(cartItem))}
                  />
                  <p className="text-body-bold">{cartItem.inStock}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() =>  dispatch(addToBasketIncrease(cartItem))}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => dispatch(removeFromCart(cartItem))}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cartItems.length} ${
            cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>$ {totalRounded}</span>
        </div>
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartClient;
