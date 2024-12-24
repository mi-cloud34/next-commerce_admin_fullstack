import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    surname: string;
    isAdmin: boolean;
    isVerified: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      surname: string;
      isAdmin: boolean;
      isVerified: boolean;
    };
  }

  interface JWT {
    id: string;
    surname: string;
    isAdmin: boolean;
    isVerified: boolean;
  }
}
