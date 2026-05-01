import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt"
   },
   providers: [
      CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {}
			},
         async authorize (credentials, req) {
            if (credentials?.password == "") {
               return null;
            } else {
               console.log(credentials?.password);
               
               const actualPassword = process.env.UNLOCK_PWD!;
               if (!actualPassword) return null;

               if (credentials?.password === actualPassword) {
                  return {
                     id: 'admin-user-1',
                     email: "ayeikperfumes@gmail.com",
                     name: "Ayeik Perfumes Admin",
                     image: '/logo.jpg'
                  }
               } else {
                  return null;
               }
            }
         }
      })
   ],
   callbacks: {
      jwt: async ({ user, token, trigger, session }) => {
         if (trigger == "update") {
            return { ...token, ...session.user }
         }
         return { ...token, ...user }
      }
   }
}