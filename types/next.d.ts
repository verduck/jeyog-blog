import { GithubUser } from './githubUser'

declare module 'next' {
  export interface NextApiRequest {
    user?: GithubUser
  }
}
