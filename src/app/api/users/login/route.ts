import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connectMongoDb } from "@/lib/MongoConnect";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";  // JWT oluşturmak için
import { serialize } from "cookie";  // Cookie oluşturmak için
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;  // JWT için gizli anahtar

export  async function POST(req: NextRequest, res: NextResponse) {
    const reqBody = await req.json();
  const { email, password } = reqBody;

  if (!email || !password) {
    return NextResponse.json({error:"invalid email and password",status:400});
  }

  try {
    await connectMongoDb();
    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({error:"dont find user",status:400});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return NextResponse.json({error:"invalid  password",status:400});
    }

    // JWT token oluşturuluyor
    const token = jwt.sign(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        surname: user.surname,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      },
      SECRET_KEY,
      { expiresIn: "1h" } // Token 1 saat geçerli olacak
    );

    // Token'ı Cookie'ye kaydediyoruz
    const cookie = serialize("token", token, {
      httpOnly: true,  // JavaScript erişimi yasakla
      secure: process.env.NODE_ENV === "production",  // Prod ortamda sadece HTTPS üzerinden
      sameSite: "strict",  // CSRF saldırılarını engellemek için
      maxAge: 60 * 60,  // 1 saat geçerlilik
      path: "/",
    });
    const response = NextResponse.json({ message: "Successful" }, { status: 200 });
    response.headers.set("Set-Cookie", cookie);
    return NextResponse.json({message:"Successful",status:400});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error:"error",status:400});
  }
}
