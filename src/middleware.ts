import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('🔵 Middleware - Path:', pathname);
  console.log('🔵 Middleware - All cookies:', request.cookies.getAll().map(c => c.name));
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/callback',
    '/api/auth',
  ];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname === route || pathname.startsWith(route);
  });
  
  console.log('🔵 Middleware - isPublicRoute:', isPublicRoute);

  // If it's a public route, allow access
  if (isPublicRoute) {
    console.log('🔵 Middleware - Public route, allowing access');
    return NextResponse.next();
  }

  // Check for authentication token in httpOnly cookie
  const token = request.cookies.get('access_token')?.value;
  console.log('🔵 Middleware - Token:', token ? 'SET' : 'NOT SET');
  console.log('🔵 Middleware - Token value:', token ? token.substring(0, 20) + '...' : 'NONE');
  
  // If no token and trying to access protected route, redirect to login
  if (!token) {
    console.log('🔴 Middleware - No token, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add user data to headers for server components
  const userData = request.cookies.get('user_data')?.value;
  if (userData) {
    const response = NextResponse.next();
    response.headers.set('x-user-data', userData);
    console.log('🔵 Middleware - Allowing access to protected route with user data');
    return response;
  }

  console.log('🔵 Middleware - Allowing access to protected route');
  return NextResponse.next();
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
};
