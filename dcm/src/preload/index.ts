import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { RegisterUserResponse, LoginUserResponse } from '../common/types'

// Custom APIs for renderer
const api = {
  registerUser: async (
    username: string,
    password: string,
    serialNumber: string,
  ): Promise<RegisterUserResponse> => {
    const result = await ipcRenderer.invoke('register-user', username, password, serialNumber)
    return result
  },
  loginUser: async (username: string, password: string): Promise<LoginUserResponse> => {
    const result = await ipcRenderer.invoke('login-user', username, password)
    return result
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
