import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import { connectMongoDb } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";

const  GET=async()=>{
    try {
        await connectMongoDb()
        const data=await Category.find()
     //   console.log("datammmm",data);
        
        return NextResponse.json(data)
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