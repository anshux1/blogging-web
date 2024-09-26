import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname

  if (token && (pathname === '/signin' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && (pathname === '/create-blog' || pathname === '/dashboard')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}
