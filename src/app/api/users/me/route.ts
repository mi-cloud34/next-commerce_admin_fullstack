import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


    const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

    export async function GET(req: NextRequest) {
      console.log("Request Headers", req.headers);
    
      try {
       
        const authHeader = req.headers.get("authorization");
    
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    
        const token = authHeader.split(" ")[1]; // Bearer <token>
    
        // Token'ı doğrula
        const user = jwt.verify(token, SECRET_KEY);
        console.log("UserMeeeeeeeeee:", user);
    
        if (!user) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
        }
    
        return NextResponse.json({
          message: "User found",
          data: user,
        });
      } catch (error: any) {
        console.error("Error verifying token:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
    