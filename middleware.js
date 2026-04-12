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

  // 2. Check for standalone category pages like /courses/certifications
  // and redirect them to /courses?category=certifications
  if (pathname.startsWith('/courses/')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 2) {
      const category = segments[1];
      const url = request.nextUrl.clone();
      url.pathname = '/courses';
      url.searchParams.set('category', category);
      return NextResponse.redirect(url, 301);
    }
  }

  // 3. Check if the path contains any uppercase characters
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
