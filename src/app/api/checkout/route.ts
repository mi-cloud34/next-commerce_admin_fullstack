import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();
   console.log("cartIremssss",cartItems);
   console.log("customernnnnnnnn",customer);
   
   
    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US",],
      },
      shipping_options: [
        { shipping_rate: "shr_1Qb8YFDQXSNlhc8m9GJqkzbh" },
      
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: cartItem.name,
            metadata: {
              productId: cartItem._id,
              ...(cartItem.size && { size: cartItem.size }),
              ...(cartItem.color && { color: cartItem.color }),
            },
          },
          unit_amount: cartItem.price * 100,
        },
        quantity: cartItem.inStock,
      })),
      client_reference_id: customer.id,
      success_url: `${process.env.BASE_URL}/payment_success`,
      cancel_url: `${process.env.BASE_URL}/cart`,
    });
    console.log("sesionnnnnnnn",session);
    
    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
