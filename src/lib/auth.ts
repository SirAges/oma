import NextAuth, { User } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

import config from "./config";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: config.env.secret,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        //@ts-expect-error role
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        //@ts-expect-error id type
        session.user.id = token.id as number;
        //@ts-expect-error role
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name;
      }
      return session;
    },
  },
});
