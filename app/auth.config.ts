import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    {
      id: "microsoft",
      name: "Microsoft",
      type: "oauth",
      version: "2.0",
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      authorization: {
        url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        params: {
          scope: "openid email profile",
        },
      },
      token: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      userinfo: "https://graph.microsoft.com/v1.0/me",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.displayName || profile.userPrincipalName,
          email: profile.mail || profile.userPrincipalName,
          image: null,
        };
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
