import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = [
    {Path : '/login', whenauth: 'redirect'},
    
]

const Redirect_when_not_authenticades = '/login' 



export function middleware(request: NextRequest) {
    console.log('funcionou')
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authtoken = request.cookies.get('token')

    if (!authtoken && publicRoute){
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = Redirect_when_not_authenticades
        return NextResponse.next()
    }
    
    return NextRequest.redirect(redirectUrl)
}

export const config:MiddlewareConfig ={
    
    matcher: [

        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico, sitemap.xml, robots.txt (metadata files)
        */
       '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]   

}