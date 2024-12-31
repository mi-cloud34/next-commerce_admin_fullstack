import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

 
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("Token:", token);

 
  try {
    const response = await axios.post(`${process.env.BASE_URL}/api/users/verify_token`, { token });
    const user = response.data.user;
    const isAdmin = user.isAdmin;

    console.log("isAdmin:", isAdmin);

   
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }

   
    if (isAdmin && request.nextUrl.pathname === "/admin") {
      return NextResponse.next();
    }

    
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/admin"], 
};
