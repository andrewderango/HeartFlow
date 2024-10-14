import { ElectronAPI } from '@electron-toolkit/preload'
import type { RegisterUserResponse, LoginUserResponse } from '../common/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      registerUser: (
        username: string,
        password: string,
        serialNumber: string,
      ) => Promise<RegisterUserResponse>
      loginUser: (username: string, password: string) => Promise<LoginUserResponse>
    }
  }
}
