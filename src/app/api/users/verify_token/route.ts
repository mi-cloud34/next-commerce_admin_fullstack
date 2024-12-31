import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json(); 
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Token doğrulama
    const user = jwt.verify(token, SECRET_KEY);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
