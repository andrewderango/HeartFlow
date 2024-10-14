export interface User {
  username: string
  passwordHash: string
  serialNumber: string
}

export interface PublicUser {
  username: string
  serialNumber: string
}

export interface RegisterUserResponse {
  success: boolean
  message?: string
}

export interface LoginUserResponse {
  success: boolean
  user?: PublicUser
  message?: string
}
