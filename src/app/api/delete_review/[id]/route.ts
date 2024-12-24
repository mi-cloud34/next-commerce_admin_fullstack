import Product from "@/lib/models/Product";
import Review from "@/lib/models/Review";
import { connectMongoDb } from "@/lib/MongoConnect";
import mongoose from "mongoose";
import {NextResponse } from "next/server";

export async function DELETE(request: Request, {params}:{params:{id:string }}){
    try {
        
       
        await connectMongoDb()
        const idd=new mongoose.Types.ObjectId(params.id);
        console.log("review server id",params);
        
     await Review.findByIdAndDelete(idd)
  
        
        return NextResponse.json({msg:"Delete Successful"})
    } catch (error) {
        return NextResponse.json({
            error,
            msg:"Something wrong"
        },
    {status:400}
    )
    }
}