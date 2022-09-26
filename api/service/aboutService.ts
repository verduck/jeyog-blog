import { About } from "@@types/about";

export interface AboutService {
    getAbout(): Promise<About>
}