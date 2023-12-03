import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { JwtTokenStorageKey } from "~/atoms/jwt-token-atom";
import { authPages, AuthPages, type AuthPage } from "~/constants/auth-pages";
import { getUserByTokenOrThrowUnauthorizedError } from "~/server/db-utils";

const mainPageUrl = "/";
const loginPageUrl: AuthPage = AuthPages["/hello-again"];
export async function middleware(req: NextRequest) {
  const goToLoginPage = () =>
    NextResponse.redirect(new URL(loginPageUrl, req.url), {});
  const goToMainPage = () =>
    NextResponse.redirect(new URL(mainPageUrl, req.url), {});
  const { pathname } = req.nextUrl;

  const isInAuthFormPage = authPages.some((authPage) => pathname === authPage);
  const cookieStore = cookies();
  const jwtToken = cookieStore.get(JwtTokenStorageKey)?.value;

  try {
    await getUserByTokenOrThrowUnauthorizedError({ jwtToken });
    //user is authorized
    if (isInAuthFormPage) {
      console.log(`logged in + public page: ${pathname}`);
      return goToMainPage();
    }
    console.log(`logged in + protected page: ${pathname}`);
    return NextResponse.next();
  } catch (error) {
    //user is not authorized
    if (!isInAuthFormPage) {
      console.log(`logged out + protected page: ${pathname}`);
      return goToLoginPage();
    }
    console.log(`logged out + public page: ${pathname}`);
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
