import { Role } from '@prisma/client';
import { type DefaultSession, AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { createUser, findUser } from '@/utils/database/user.query';
import { compareHash } from '@/utils/encryption';

import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      role: Role;
      email: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    email: string;
  }
}

export const authOptions: AuthOptions = {
  theme: {
    colorScheme: 'light',
    brandColor: '#EA9715',
    logo: '/dummy.jpeg'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'user@student.smktelkom-mlg.sch.id'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********'
        }
      },
      async authorize(credentials) {
        try {
          const user = await findUser({ email: credentials?.email });
          if (!user) return null;

          console.log(user.password);

          const comparePassword = await compareHash(
            credentials?.password!,
            user.password!
          );

          if (!comparePassword) return null;

          const payload = {
            id: user.id,
            role: user.role,
            email: user.email
          };
          return payload;
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: false
    })
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    error: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith('/')
        ? new URL(url, baseUrl).toString()
        : url;
      return redirectUrl;
    },
    async signIn({ user }) {
      if (user.email && user.name) {
        const userdb = await findUser({ email: user.email });
        if (!userdb) {
          await createUser({ name: user.name, email: user.email });
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        const userdb = await findUser({ id: token.id });
        if (!userdb) return token;
        token.id = userdb?.id;
        token.role = userdb?.role;
      }
      if (user?.email) {
        const userdb = await findUser({ email: user.email });
        if (!userdb) return token;
        token.id = userdb?.id;
        token.role = userdb?.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        const userdb = await findUser({ id: token.id });
        session.user.role = userdb?.role as Role;
        session.user.email = userdb?.email as string;
        session.user.id = userdb?.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export const nextGetServerSession = () => getServerSession(authOptions);
