import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { JwtTokenStorageKey } from "~/atoms/jwt-token-atom";
import { authPages } from "~/constants/auth-pages";
import { env } from "~/env.mjs";
import { getUserByTokenOrThrowUnauthorizedError } from "~/server/db-utils";


const mainPageUrl = "/"
const loginPageUrl = "/hello-again"
export async function middleware(req: Request) {
    const goToLoginPage = () =>
        NextResponse.redirect(new URL(loginPageUrl, req.url), {});
    const goToMainPage = () =>
        NextResponse.redirect(new URL(mainPageUrl, req.url), {});

    const isInAuthFormPage = authPages.some(authPage => req.url === env.WEB_URL + authPage)
    const cookieStore = cookies();
    const jwtToken = cookieStore.get(JwtTokenStorageKey)?.value;

    try {
        await getUserByTokenOrThrowUnauthorizedError({ jwtToken });
        //user is authorized
        if (isInAuthFormPage) {
            console.log('logged in + public page')
            return goToMainPage()
        }
        console.log('logged in + protected page')
        return NextResponse.next();
    } catch (error) {
        //user is not authorized
        if (!isInAuthFormPage) {
            console.log('logged out + public page')
            return goToLoginPage();
        }
        console.log('logged out + protected page')
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
