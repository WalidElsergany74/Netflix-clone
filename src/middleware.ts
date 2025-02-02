import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    const pathname = request.nextUrl.pathname;

   
    const isAuth = await getToken({ req: request });

  
    const isAuthPage = pathname.includes("signin") || pathname.includes("signup");


    const protectedRoutes = ["/user/list"];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL(`/signin`, request.url));
    }

    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }

    return response;
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
 
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
