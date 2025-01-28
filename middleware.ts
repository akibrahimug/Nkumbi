import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // If the user is authenticated, continue to the requested page
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow access if there is a valid token
    },
    pages: {
      signIn: "/auth",
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: [
    "/profile/:path*",
    "/settings/:path*",
    "/transportation/:path*",
    "/profile/settings/:path*",
    "/marketplace/:path*",
    "/community/:path*",
  ],
};
