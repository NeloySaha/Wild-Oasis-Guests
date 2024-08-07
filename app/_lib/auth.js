import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request }) => {
      return !!auth?.user;
    },
    // runs before actually signing in but at this point, you have the user's credentials
    signIn: async ({ user, account, profile }) => {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          const newGuest = { fullName: user.name, email: user.email };
          await createGuest(newGuest);
        }

        return true;
      } catch {
        return false;
      }
    },

    session: async ({ session, user }) => {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest?.id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authConfig);
