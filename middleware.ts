import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const url1 = req.url
    const pathname = new URL(req.url).pathname;
    if (!token && pathname !== "/login") {
        console.warn('Usuário sem token, redirecionando para login.', url1);
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (token && pathname === "/login"  ) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    try {
        console.log('Token válido, permitindo acesso.',url1);
        return NextResponse.next();
        

    } catch (error) {
        console.error('Token inválido, redirecionando para login.', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// 🔥 Protege todas as rotas dentro de `/dashboard`
export const config = {
    matcher: ['/dashboard/:path*', '/login'], // Agora protege todas as subrotas de /dashboard/
};
