import { NextResponse } from 'next/server';
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Skip internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Check if the path contains any uppercase characters
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    // 301 is a permanent redirect
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Minimal config - handle all routes or use simple paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _next/static, _next/image
     * - favicon, images, fonts
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
