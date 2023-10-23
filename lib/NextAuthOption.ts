import type { NextAuthOptions } from "next-auth";
import { connectMongoDB } from "@/lib/MongoDB";
import UserModel from "@/lib/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }

        try {
          await connectMongoDB();
          const userExist = await UserModel.findOne({ email });
          if (!userExist) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(
            password,
            userExist.password
          );
          if (!passwordMatch) {
            return null;
          }

          return userExist;
        } catch (error) {
          console.log("Next auth error: ", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
