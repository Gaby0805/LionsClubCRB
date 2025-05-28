import { jwtVerify } from 'jose';
import { NextResponse, NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.SECRET_KEY || 'fallback');

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  try {
    if (token) {
      await jwtVerify(token, secret);

      // Impede acesso à página de login se já estiver autenticado
      if (pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      return NextResponse.next();
    }

    // Se não houver token e estiver tentando acessar rota protegida
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();

  } catch (err) {
    console.warn('Token inválido ou ausente.', err);

    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
