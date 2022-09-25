import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account?.access_token) {
                token.access_token = account.access_token
            }
            return token
        },

        async session({ session, token, user }) {
            session.user.id = Number(token.sub)
            session.access_token = token.access_token
            return session
        }
    }
})