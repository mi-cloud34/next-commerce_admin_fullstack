import Product from "@/lib/models/Product";
import { connectMongoDb } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, name, description, categoryId, brand, price, inStock, rating } = body;

    console.log("body", body);

   
    if (!_id || !name || !description || !categoryId || !brand || !price || !inStock || !rating) {
      return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
    }

  
    const productObjectId = new ObjectId(_id);
    const categoryObjectId = new ObjectId(categoryId);

   
    await connectMongoDb();

    
    const updatedProduct = await Product.findByIdAndUpdate(
      productObjectId,
      {
        $set: {
          name,
          description,
          categoryId: categoryObjectId,
          brand,
          price,
          inStock,
          rating,
        },
      },
      { new: true } 
    );

    if (!updatedProduct) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }

    console.log("updatedProduct", updatedProduct);

    return NextResponse.json({ msg: "Update successful", data: updatedProduct });
  } catch (error:any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        error: error.message,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
