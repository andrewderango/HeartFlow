import { create } from 'zustand'
import type { Mode, ConnectionStatus, TelemetryStatus } from '../../../common/types'

// todo: add the rest of the state as needed
// todo: VERY IMPORTANT: change numbers to strings
// todo: VERY IMPORTANT: to avoid breaking the UI, parse to number when needed

interface UserState {
  username: string
  serialNumber: string
}

interface PacemakerState {
  lastUsedMode: Mode
  currentMode: Mode
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
  telemetry: {
    heartRate: number
  }
}

interface TelemetryState {
  connectionStatus: ConnectionStatus
  telemetryStatus: TelemetryStatus
}

type UserAction = { type: 'UPDATE_USER'; payload: Partial<UserState> }

type PacemakerAction =
  | {
      type: 'UPDATE_MODE_SETTINGS'
      payload: {
        mode: Mode
        settings: Partial<PacemakerState['modes'][keyof PacemakerState['modes']]>
      }
    }
  | { type: 'UPDATE_TELEMETRY'; payload: Partial<PacemakerState['telemetry']> }
  | { type: 'UPDATE_LAST_USED_MODE'; payload: Mode }
  | { type: 'UPDATE_CURRENT_MODE'; payload: Mode }

type TelemetryAction =
  | { type: 'UPDATE_CONNECTION_STATUS'; payload: ConnectionStatus }
  | { type: 'UPDATE_TELEMETRY_STATUS'; payload: TelemetryStatus }

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const pacemakerReducer = (state: PacemakerState, action: PacemakerAction): PacemakerState => {
  switch (action.type) {
    case 'UPDATE_MODE_SETTINGS':
      return {
        ...state,
        modes: {
          ...state.modes,
          [action.payload.mode]: {
            ...state.modes[action.payload.mode],
            ...action.payload.settings,
          },
        },
      }
    case 'UPDATE_TELEMETRY':
      return { ...state, telemetry: { ...state.telemetry, ...action.payload } }
    case 'UPDATE_LAST_USED_MODE':
      return { ...state, lastUsedMode: action.payload }
    case 'UPDATE_CURRENT_MODE':
      return { ...state, currentMode: action.payload }
    default:
      return state
  }
}

const telemetryReducer = (state: TelemetryState, action: TelemetryAction): TelemetryState => {
  switch (action.type) {
    case 'UPDATE_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload }
    case 'UPDATE_TELEMETRY_STATUS':
      return { ...state, telemetryStatus: action.payload }
    default:
      return state
  }
}

const useStore = create<
  UserState &
    PacemakerState &
    TelemetryState & { dispatch: (action: UserAction | PacemakerAction | TelemetryAction) => void }
>((set) => ({
  username: '',
  serialNumber: '',
  lastUsedMode: 'OFF',
  currentMode: 'OFF',
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
  telemetry: {
    heartRate: 0,
  },
  connectionStatus: 'DISCONNECTED',
  telemetryStatus: 'OFF',
  dispatch: (action): void => {
    if ('type' in action) {
      switch (action.type) {
        case 'UPDATE_USER':
          set((state) => userReducer(state, action))
          break
        case 'UPDATE_MODE_SETTINGS':
        case 'UPDATE_TELEMETRY':
        case 'UPDATE_LAST_USED_MODE':
        case 'UPDATE_CURRENT_MODE':
          set((state) => pacemakerReducer(state, action))
          break
        case 'UPDATE_CONNECTION_STATUS':
        case 'UPDATE_TELEMETRY_STATUS':
          set((state) => telemetryReducer(state, action))
          break
        default:
          break
      }
    }
  },
}))

export default useStore
