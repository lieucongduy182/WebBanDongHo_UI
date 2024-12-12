/* eslint-disable no-unused-vars */
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
    };
    accessToken: string;
  }
}
