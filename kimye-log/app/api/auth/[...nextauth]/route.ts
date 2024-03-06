import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

interface GitHubProviderType {
  clientId: string;
  clientSecret: string;
}
export const authOptions = {
  // secret: process.env.SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
