interface RegisterUserResponse {
  success: boolean
  message?: string
}

interface Window {
  electron: typeof import('@electron-toolkit/preload').electronAPI
  api: {
    registerUser: (
      username: string,
      password: string,
      serialNumber: string,
    ) => Promise<RegisterUserResponse>
  }
}
