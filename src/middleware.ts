import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { JwtTokenStorageKey } from "~/atoms/jwt-token-atom";
import { env } from "~/env.mjs";
import { getUserByTokenOrThrowUnauthorizedError } from "~/server/db-utils";

export async function middleware(req: Request) {
    const isInPublicPage =
        req.url === env.WEB_URL + "/hello" ||
        req.url === env.WEB_URL + "/hello-again";
    if (isInPublicPage) {
        return NextResponse.next();
    }
    const logOut = () =>
        NextResponse.redirect(new URL("/hello-again", req.url), {});

    const cookieStore = cookies();
    const jwtCookie = cookieStore.get(JwtTokenStorageKey);
    if (!jwtCookie) {
        console.log("no jwt cookie");
        return logOut();
    }
    const jwtToken = jwtCookie?.value;
    console.log({ jwtToken });
    if (!jwtToken) {
        console.log("no jwt token");

        return logOut();
    }
    try {
        const res = await getUserByTokenOrThrowUnauthorizedError({ jwtToken });
        console.log({ res });
        console.log("you are logged in ");

        return NextResponse.next();
    } catch (error) {
        console.log("you are not logged in");
        return logOut();
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
