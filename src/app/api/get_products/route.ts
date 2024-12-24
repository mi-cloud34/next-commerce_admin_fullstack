import Product from "@/lib/models/Product";
import { connectMongoDb } from "@/lib/MongoConnect";
import { NextResponse,NextRequest } from "next/server";
import { Types } from "mongoose";

const  GET=async(req:NextRequest,res:NextResponse)=>{
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');
  const searchTerm = searchParams.get("q");
  // Filtreleme için whereClause'u dinamik olarak oluşturuyoruz

    try {
        await connectMongoDb()
/* if (!categoryId&&categoryId==null) {
  const data = await Product.find();
return NextResponse.json(data)


} */ let products;

if (categoryId) {
  products = await Product.find({ categoryId });}
  else if (searchTerm) {
    products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } }
      ]
    }); 
    
  }
 else {
  products = await Product.find(); // Tüm ürünleri getir
}
        
    return NextResponse.json(products)
  
     
    } catch (error) {
        return NextResponse.json({
            error,
            msg:"Something wrong"
        },
    {status:400}
    )
    }
}
export {GET} ;