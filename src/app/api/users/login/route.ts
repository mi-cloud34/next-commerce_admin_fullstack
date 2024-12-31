import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { connectMongoDb } from "@/lib/MongoConnect";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";  
import { serialize } from "cookie";  
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;  

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
      { expiresIn: "1h" } 
    );
    
    
    const cookie = serialize("token", token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === "production",  
      sameSite: "strict", 
      maxAge: 60 * 60 * 24, 
      path: "/",
    });
    
     // Doğrulama kontrolü
     if (!user.isVerified) {
      return NextResponse.json(
          {
              message: "Hesabınız doğrulanmamış. Doğrulama sayfasına yönlendiriliyorsunuz.",
              redirectTo: "/verify", 
          },
          { status: 403 }
      );
  }
    const response = NextResponse.json(
      {
        data: user,
        token: token,
        message: "Login successful",
        status: 200,
      }
    );
response.headers.set("Set-Cookie", cookie);
return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({error:"error",status:400});
  }
}
