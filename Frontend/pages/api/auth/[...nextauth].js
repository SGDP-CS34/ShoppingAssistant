import NextAuth from "next-auth";
import axios from "@/utils/axios";
import CredentialsProvider from "next-auth/providers/credentials";

// Define authentication options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      // Define the authorization logic for the credentials provider
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // Make a POST request to the /user/login endpoint to authenticate the user
        const response = await axios.post(
          "/user/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { user, token, expiresAt } = response.data;
        if (user && token && expiresAt) {
          user.id = user.id;
          user.token = token;
          user.expiresAt = expiresAt;
          return user;
        }
        return null;
      },
    }),
  ],
  // Define JWT callbacks for token and session management
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.userId = token.userId;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // Define the session strategy to use
  session: {
    strategy: "jwt",
  },
  // Define the sign-in page
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
