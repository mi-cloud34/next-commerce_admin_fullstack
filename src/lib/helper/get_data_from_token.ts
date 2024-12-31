import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}
/* import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export async function GET(req: NextRequest) {
  // Cookie'den token'ı al
  const token = req.headers
    .get("cookie")
    ?.split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
 */