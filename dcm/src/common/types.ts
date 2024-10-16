export interface User {
  username: string
  passwordHash: string
  serialNumber: string
  modes: {
    VOO: {
      ventricularAmplitude: number
      ventricularPulseWidth: number
      ventricularRefractoryPeriod: number
      lowerRateLimit: number
    }
    AOO: {
      atrialAmplitude: number
      atrialPulseWidth: number
      atrialRefractoryPeriod: number
      lowerRateLimit: number
    }
    VVI: {
      ventricularAmplitude: number
      ventricularPulseWidth: number
      ventricularRefractoryPeriod: number
      lowerRateLimit: number
    }
    AAI: {
      atrialAmplitude: number
      atrialPulseWidth: number
      atrialRefractoryPeriod: number
      lowerRateLimit: number
    }
  }
  lastUsedMode?: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF'
}

export const createUser = (overrides: Partial<User> = {}): User =>
  ({
    username: '',
    passwordHash: '',
    serialNumber: '',
    modes: {
      VOO: {
        ventricularAmplitude: 0,
        ventricularPulseWidth: 0,
        ventricularRefractoryPeriod: 0,
        lowerRateLimit: 0,
      },
      AOO: {
        atrialAmplitude: 0,
        atrialPulseWidth: 0,
        atrialRefractoryPeriod: 0,
        lowerRateLimit: 0,
      },
      VVI: {
        ventricularAmplitude: 0,
        ventricularPulseWidth: 0,
        ventricularRefractoryPeriod: 0,
        lowerRateLimit: 0,
      },
      AAI: {
        atrialAmplitude: 0,
        atrialPulseWidth: 0,
        atrialRefractoryPeriod: 0,
        lowerRateLimit: 0,
      },
    },
    lastUsedMode: 'OFF',
    ...overrides,
  }) as User

export interface PublicUser {
  username: string
  serialNumber: string
  lastUsedMode?: 'VOO' | 'AOO' | 'VVI' | 'AAI' | 'OFF'
}

export interface RegisterUserResponse {
  success: boolean
  message?: string
}

export interface SetUserResponse {
  success: boolean
  message?: string
}

export interface LoginUserResponse {
  success: boolean
  user?: PublicUser
  message?: string
}

export interface ModeSettingResponse {
  success: boolean
  settings?: Record<string, number>
  message?: string
}

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  removing?: boolean
}
