import Category from "@/lib/models/Category";
import { connectMongoDb } from "@/lib/MongoConnect";
import mongoose from "mongoose";
import {NextResponse } from "next/server";

export async function DELETE(request: Request, {params}:{params:{id:string }}){
    try {
        
       
        await connectMongoDb()
        const idd=new mongoose.Types.ObjectId(params.id);
        console.log("category server id",params);
        
     await Category.findByIdAndDelete(idd)
  
        
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