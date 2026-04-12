import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Check if the path contains any uppercase characters
  if (pathname !== pathname.toLowerCase()) {
    // If it does, redirect to the lowercase version
    const url = new URL(request.url);
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301); // 301 is a permanent redirect (important for SEO)
  }

  return NextResponse.next();
}

// Ensure the middleware doesn't run on internal paths or static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .png, .jpg, .jpeg, .svg, .gif, .webp (images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)).*)',
  ],
};
