
            import { NextApiRequest, NextApiResponse } from "next";
            import { NextResponse } from "next/server";
            import { serialize } from "cookie";
            
            export async function POST(req: NextApiRequest, res: NextApiResponse) {
              try {
               
                const cookie = serialize("token", "", {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "strict",
                  maxAge: 0, 
                  path: "/",
                });
            
                const response = NextResponse.json({
                  message: "Logout successful",
                  status: 200,
                });
                response.headers.set("Set-Cookie", cookie);
            
                return response;
              } catch (error) {
                console.error("Logout error:", error);
                return NextResponse.json(
                  { error: "Logout failed", status: 500 },
                  { status: 500 }
                );
              }
            }
            