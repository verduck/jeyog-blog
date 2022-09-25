import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    export interface Session {
        user: {
            id: number
            access_token: string
        } & DefaultSession['user']
    }
}