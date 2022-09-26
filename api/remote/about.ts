import { publicAPI } from "@api/core";
import { AboutService } from "@api/service/aboutService";
import { throwError } from "@api/utils/throwError";

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