import { cookies } from "next/headers";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { AuthService } from "@/services/auth";
import { LoginResponseType } from "@/types/profile";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "manhbinh99@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          const response = await AuthService.signInWithCredentials({
            username,
            password,
          });

          const dataLogin: LoginResponseType = response.data;

          if (dataLogin.quyen != 2) {
            throw new Error("invalid credentials");
          }

          cookies().set("username", dataLogin.username, {
            maxAge: 24 * 60 * 60 * 365,
          });

          return {
            id: dataLogin.username,
            name: dataLogin.username,
            ...dataLogin,
          };
        } catch (error) {
          throw new Error("invalid credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 365,
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
