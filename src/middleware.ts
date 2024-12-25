import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Eğer session yoksa ana sayfaya yönlendir
/*   if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
 */
  // Token varsa isAdmin durumunu kontrol et
 /*  const isAdmin = token.isAdmin;
 */
  // Eğer kullanıcı admin değilse /admin sayfasına yönlendirme
/*   if (!isAdmin && request.nextUrl.pathname === "/admin") {
    return NextResponse.redirect(new URL("/", request.url));
  } */

  // Aksi durumda isteğe izin ver
  return NextResponse.next();
}

/* export const config = {
  matcher: ["/admin"], // Yalnızca /admin yolunu hedefle
}; */
