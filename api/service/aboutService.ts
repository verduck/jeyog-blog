import { About } from "@@types/about";

export interface AboutService {
    getAboutByGithubId(githubId: number): Promise<About>
}