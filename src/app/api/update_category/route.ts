
import { connectMongoDb } from "@/lib/MongoConnect";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Category from "@/lib/models/Category";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, name } = body;

    console.log("body", body);

  
    if (!_id || !name ) {
      return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
    }

  
    const categoryObjectId = new ObjectId(_id);
  
   
    await connectMongoDb();

    
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryObjectId,
      {
        $set: {
          name,
         
        },
      },
      { new: true } // Güncellenmiş belgeyi döndür
    );

    if (!updatedCategory) {
      return NextResponse.json({ msg: "Category not found" }, { status: 404 });
    }

    console.log("updatedCategory", updatedCategory);

    return NextResponse.json({ msg: "Update successful", data: updatedCategory }, { status: 200 });
  } catch (error:any) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      {
        error: error.message,
        msg: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
