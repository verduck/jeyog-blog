import { aboutDataRemote } from './remote/about'
import { AboutService } from './service/aboutService'

const provideAPIService = () => {
  const aboutService = aboutDataRemote()

  return {
    aboutService,
  }
}

export const api = provideAPIService()

export interface APIService {
  aboutService: AboutService
}
