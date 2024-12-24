import Product from "@/lib/models/Product";
import Review from "@/lib/models/Review";
import { connectMongoDb } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const body=await request.json();
       
       
        const {comment,rating,productId,createdAt}=body;
        let userId=body["userId"];
        userId=body.user;
        await connectMongoDb();
        const data=await Review.create({
            userId,comment,rating,productId,createdAt
        })
       
        

        console.log("data",data);
        
    return NextResponse.json({msg:"UpdateSuccessful",data})
    } catch (error) {
        return NextResponse.json({
            error,
            msg:"Something wrong"
        },
    {status:400}
    )
    }
}