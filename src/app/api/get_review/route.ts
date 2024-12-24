import Product from "@/lib/models/Product";
import Review from "@/lib/models/Review";
import { connectMongoDb } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";

const  GET=async()=>{
    try {
        await connectMongoDb()
        const data=await Review.find()
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