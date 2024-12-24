import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectMongoDb } from "@/lib/MongoConnect";
import User from "@/lib/models/User";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connectMongoDb();
          const user = await User.findOne({ email: credentials?.email });
      
          if (!user) {
            throw new Error("Kullanıcı bulunamadı.");
          }
      
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
      
          if (!isValidPassword) {
            throw new Error("Geçersiz şifre.");
          }
      
          return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            surname: user.surname,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        await connectMongoDb();
        const existingUser = await User.findOne({ email: profile?.email });
        if (!existingUser) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // Kullanıcı oturum açtığında ek bilgileri token'a ekleyin
        token.id = user._id;
        token.surname = user.surname;
        token.isAdmin = user.isAdmin;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Session'a token'dan gelen bilgileri ekliyoruz
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          surname: token.surname,
          isAdmin: token.isAdmin,
          isVerified: token.isVerified,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

/*import NextAuth from "next-auth";

import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectMongoDb } from "@/lib/MongoConnect";
import User from "@/lib/models/User";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    },
    providers: [

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password:{},
            },
            async authorize(credentials) {
                try {
                    await connectMongoDb();
                    const user = await User.findOne({ email: credentials?.email });
                    if (!user) {
                        throw new Error("")
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    ); 
                    if (!isValidPassword) {
                        throw new Error ("")
                    }
                    return user;
                }
                catch {
                    return null
                }
            }
        })

    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                await connectMongoDb();
                const existingUser = await User.findOne({ email: profile?.email });
                if (!existingUser) {
                    await User.create({
                        name: profile?.name,
                        email: profile?.email,
                    })
                }
            }
            return true;
              },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                };
            };
            return session;
        }
        
    },
    pages: {
       signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET
    

  
});
export { handler as GET, handler as POST };*/