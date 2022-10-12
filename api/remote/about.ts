import { publicAPI } from '@api/core'
import { AboutService } from '@api/service/aboutService'
import { throwError } from '@api/utils/throwError'

export const aboutDataRemote = (): AboutService => ({
  getAboutByGithubId: async (githubId: number) => {
    try {
      const response = await publicAPI.get({
        url: `/abouts/${githubId}`,
      })
      return response.data
    } catch (error) {
      throwError(error)
    }
  },
})
