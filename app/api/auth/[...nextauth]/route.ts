import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/email";

// 1) Import the Mongoose adapter
import { MongoDBAdapter } from "@auth/mongodb-adapter";
// 2) Import or create a Mongoose connection promise
import client from "@/lib/mongoose";

// Some people prefer to directly do:
// const clientPromise = mongoose.connect(process.env.MONGODB_URI);
// But we'll just re-use our clientPromise

export const authOptions = {
  // 3) Use the Mongoose Adapter
  adapter: MongoDBAdapter(client),

  // 4) Configure your providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    // You can keep EmailProvider or remove it if not needed
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  // 5) You need a secret for JWT sessions
  secret: process.env.NEXTAUTH_SECRET,

  // We use JWT sessions by default
  session: {
    strategy: "jwt",
  },

  // 6) Callbacks to control session/user objects
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      // `user` is typically the database user object.
      // `session.user` is the payload you return to the client.
      session.user.id = user.id;
      return session;
    },
  },
};

// NextAuth in Next.js 13 => export GET and POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
