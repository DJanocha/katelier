export const authPages = ['/hello', '/hello-again'] as const
export type AuthPage = typeof authPages[number]
export const AuthPages: { [key in AuthPage]: AuthPage } = {
    "/hello": "/hello",
    "/hello-again": '/hello-again'
}