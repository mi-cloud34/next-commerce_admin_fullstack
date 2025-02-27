import Product from "@/lib/models/Product";
import { connectMongoDb } from "@/lib/MongoConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

 const GET = async (req: Request, { params }: { params: { productId: string } }) => {
  try {
    await connectMongoDb();
    
    const { productId } = params; 
    console.log("iddd5555555555",mongoose.Types.ObjectId.isValid(productId)); 
    if (!productId) {
      return NextResponse.json({ msg: "Product ID is required" }, { status: 400 });
    }

   
    const product = await Product.find({_id: productId});

    if (!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
export {GET}