import { jwtVerify } from 'jose';
import { NextResponse, NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.SECRET_KEY || 'fallback');

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const pathname = new URL(req.url).pathname;

  try {
    if (token) {
      await jwtVerify(token, secret);

      if (pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      return NextResponse.next();
    }

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
