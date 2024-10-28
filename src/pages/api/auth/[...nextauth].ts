import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/lib/db"; // Adjust path if needed

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};

        try {
          const result = await query(
            "SELECT id, username FROM accounts WHERE username = $1 AND password = $2",
            [username, password]
          );

          if (result.rows.length > 0) {
            const user = result.rows[0];
            return { id: user.id.toString(), username: user.username };
          }
          return null;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // Correctly cast the strategy type
    maxAge: 30 * 24 * 60 * 60, // Optional: 30 days session expiration
  },
  callbacks: {
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        username: token.username as string,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret:process.env.NEXTAUTH_SECRET
};

// Ensure to export NextAuth as the default function
export default NextAuth(authOptions);
