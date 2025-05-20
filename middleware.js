import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth_token');
  
  // 调试信息
  console.log('Current path:', pathname);
  console.log('Auth token:', authToken);

  // 允许静态资源、API、登录页、注册页
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/public') || 
      pathname === '/login' || 
      pathname === '/register') {
    // 已登录访问 /login 自动跳转个人中心
    if (pathname === '/login' && authToken?.value) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    return NextResponse.next();
  }

  // 个人中心页面需要登录
  if (pathname.startsWith('/profile')) {
    if (!authToken?.value) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // 其他页面未登录则跳转到 /login
  if (!authToken?.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

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
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 