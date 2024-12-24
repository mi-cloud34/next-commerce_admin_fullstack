import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
// Adjust this path based on your file structure
import { serialize } from "cookie";


    export async function GET() {
      const sessionCookie = serialize("next-auth.session-token", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1, // Expire immediately
      });
    
      const csrfCookie = serialize("next-auth.csrf-token", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1, // Expire immediately
      });
    
      // Set cookies in the response header
      const response = NextResponse.json({ message: "Logged out successfully" });
      response.headers.set("Set-Cookie", `${sessionCookie}, ${csrfCookie}`);
    
      return response;
    }
 
    
   /*  try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("session-token", "",
        { httpOnly: true, expires: new Date(0)
        })

        return response;
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message},
            {status: 500});
    }  */
    
