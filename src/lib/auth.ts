import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export const config = {
   pages: {
      signIn: "/login",
   },
   adapter: PrismaAdapter(prisma),
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "email", type: "text" },
            password: { label: "password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               throw new Error("Invalid credentials");
            }

            const user = await prisma.user.findUnique({
               where: {
                  email: credentials.email,
               },
            });

            const usernameTaken = await prisma.user.findUnique({
               where: {
                  username: credentials.email.split("@")[0],
               },
            });

            const name = credentials.email.split("@")[0];
            const username = usernameTaken ? `${name}-${uuid().slice(0, 6)}` : name;

            if (!user) {
               const user = await prisma.user.create({
                  data: {
                     email: credentials.email,
                     hashedPassword: await bcrypt.hash(credentials.password, 10),
                     name,
                     username,
                  },
               });
               return user;
            }

            if (!user.hashedPassword) throw new Error("Invalid credentials");

            const isCorrectPassword = await bcrypt.compare(
               credentials.password,
               user.hashedPassword
            );

            if (!isCorrectPassword) {
               throw new Error("Invalid credentials");
            }

            return user;
         },
      }),
   ],
   session: {
      strategy: "jwt",
   },
   callbacks: {
      async session({ session, token }) {
         if (token) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.picture;
            session.user.username = token.username;
         }

         return session;
      },
      async jwt({ token, user }) {
         const prismaUser = await prisma.user.findFirst({
            where: {
               email: token.email,
            },
         });

         if (!prismaUser) {
            token.id = user.id;
            return token;
         }
         if (!prismaUser.username) {
            await prisma.user.update({
               where: {
                  id: prismaUser.id,
               },
               data: {
                  username: prismaUser.name?.split(" ").join("").toLowerCase(),
               },
            });
         }

         return {
            id: prismaUser.id,
            name: prismaUser.name,
            email: prismaUser.email,
            username: prismaUser.username,
            picture: prismaUser.image,
         };
      },
   },
} satisfies NextAuthOptions;

export default NextAuth(config);

// Use it in server contexts
export function auth(
   ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
) {
   return getServerSession(...args, config);
}
