import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodbAdapter";
import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      username?: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    username?: string;
    image?: string;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    username?: string;
    image?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider for Email/Password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "kiwanukasmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        console.log(`Attempting to sign in user: ${email ? true : false}`);

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          console.log(`No user found with email: ${email}`);
          throw new Error("No user found with this email");
        }

        console.log(`User found: ${user.email ? true : false}`);

        // Check if the password is correct
        const isValid = await compare(password, user.password);
        console.log(`Password valid: ${isValid ? true : false}`);

        if (!isValid) {
          console.log(`Invalid password for user: ${email}`);
          throw new Error("Invalid password");
        }

        console.log(`User authenticated: ${user.email ? true : false}`);

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        if ("username" in user) {
          token.username = user.username;
        }
      }
      console.log(`Token updated: ${token}`);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback triggered>>>>>>>>>>>>>>>", session, token);

      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        if (token.username) {
          session.user.username = token.username;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
