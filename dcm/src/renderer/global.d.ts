import type { LoginUserResponse, RegisterUserResponse } from '../common/types'

interface Window {
  electron: typeof import('@electron-toolkit/preload').electronAPI
  api: {
    registerUser: (
      username: string,
      password: string,
      serialNumber: string,
    ) => Promise<RegisterUserResponse>
    loginUser: (username: string, password: string) => Promise<LoginUserResponse>
  }
}
