import { AxiosError } from 'axios'

export const throwError = (error: unknown) => {
    const status = (error as AxiosError).response?.status
    switch (status) {
        case 401:
            throw new UnauthorizedError('접근 권한이 없습니다.')
        default:
            throw error
    }
}