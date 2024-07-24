import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(req) {
  const { nextUrl, nextauth } = req;

  if (!nextauth) {
    return NextResponse.redirect(new URL('/api/auth/signin', nextUrl));
  }

  if (nextUrl.pathname.startsWith('/user')) {
    return NextResponse.next();
  }

  if (!nextUrl.pathname.startsWith('/' + nextauth.token?.role.toLowerCase())) {
    return NextResponse.rewrite(new URL('/unauthorized', req.url), {
      status: 403
    });
  }
});

export const config = {
  matcher: [
    '/user/:path*',
    '/admin/:path*',
    '/donor/:path*',
    '/recipient/:path*',
    '/organization/:path*',
    '/volunteer/:path*'
  ]
};
