import { NextResponse } from 'next/server';

const decodeToken = (bearer_token) => {
  const jwt = decodeURIComponent(bearer_token.split(" ")[1])
  const jwtParts = jwt.split('.');
  const encodedBody = jwtParts[1].replace(/-/g, '+').replace(/_/g, '/');
  const base64Body = encodedBody + '=='.substring(0, (encodedBody.length % 4));
  const decodedBody = atob(base64Body);
  return (JSON.parse(decodedBody))
}

export async function middleware(req) {
  const { cookies } = req;
  const bearer_token = cookies.get('Authorization')?.value;

  // Validate token if exists
  if (bearer_token) {
    try {
      const isTokenValid = await decodeToken(bearer_token);
      if (!isTokenValid) {
        throw new Error('Invalid token signature');
      }
    } catch (error) {
      console.error('Invalid token:', error);
      return NextResponse.redirect(new URL('/auth/logout', req.url));
    }
  }

  const pathname = req.nextUrl.pathname;

  // Validate that user with token dont enter in auth pages
  if (pathname.startsWith('/auth') && !pathname.includes('/logout')) {
    if (bearer_token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // If route doesn't contain auth, then check token
  if (!pathname.startsWith('/auth')) {
    // Redirect to login if token not found
    if (!bearer_token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Check admin routes
    if (pathname.startsWith('/admin')) {
      const user = decodeToken(bearer_token);
      if (!user.is_admin) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
