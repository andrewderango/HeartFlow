import { ElectronAPI } from '@electron-toolkit/preload'

interface RegisterUserResponse {
  success: boolean
  message?: string
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      registerUser: (
        username: string,
        password: string,
        serialNumber: string,
      ) => Promise<RegisterUserResponse>
    }
  }
}
