import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodbAdapter";
import { compare } from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";

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

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    username?: string;
    picture?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return the shape that NextAuth expects
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username || user.name || "",
          username: user.username || "",
          image: user.avatar || null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
