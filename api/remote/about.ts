import { publicAPI } from "../core";
import { AboutService } from "../service/aboutService";
import { throwError } from "../utils/throwError";

export const aboutDataRemote = (): AboutService => ({
    getAbout: async () => {
        try {
            const response = await publicAPI.get({
                url: `/abouts`
            })
            return response.data
        } catch (error) {
            throwError(error)
        }
    }
})