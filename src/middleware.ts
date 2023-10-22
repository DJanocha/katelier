import { NextResponse } from "next/server"
import { env } from "~/env.mjs"


export function middleware(req: Request) {
    const authHeader = req.headers.get("Authorization")
    const isInUnauthorizedPage = req.url === env.WEB_URL + '/hello' || req.url === env.WEB_URL + '/hello-again'

    if (!authHeader && !isInUnauthorizedPage) {
        console.log({ requrl: req.url })
        return NextResponse.redirect(new URL('/hello', req.url), {})
    }
    const origin = req.headers.get("origin")
    console.log({ authHeader, origin })


    return NextResponse.next()

    // ...
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}