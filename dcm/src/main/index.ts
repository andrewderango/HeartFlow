import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {
  ensureUsersFile,
  registerUser,
  setUser,
  loginUser,
  getSettingsForMode,
} from './userService'
import { usersFilePath } from '../common/constants'
import type {
  RegisterUserResponse,
  SetUserResponse,
  LoginUserResponse,
  ModeSettingResponse,
} from '../common/types'

// default electron boilerplate
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1200,
    minHeight: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // when the app is ready, ensure the users file exists
  await ensureUsersFile(usersFilePath)

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// registering ipc handlers for relevant functions

// ipc channel for registering a user
// - expects a username, password, and serial number
// - returns a success message if the user was registered successfully
// - returns an error message if the user was not registered successfully
// - frontend must handle the response and display a relevant toast
ipcMain.handle(
  'register-user',
  async (_, username: string, password: string, serialNumber: string) => {
    try {
      await registerUser(username, password, serialNumber)
      return { success: true } as RegisterUserResponse
    } catch (error) {
      return { success: false, message: (error as Error).message } as RegisterUserResponse
    }
  },
)

// ipc channel for setting a user
// - expects a username, mode, and settings
// - returns a success message if the user was set successfully
// - returns an error message if the user was not set successfully
// - frontend must handle the response and display a relevant toast
ipcMain.handle(
  'set-user',
  async (
    _,
    username: string,
    mode: 'AOO' | 'VOO' | 'AAI' | 'VVI' | 'OFF',
    settings: Record<string, number>,
  ) => {
    try {
      await setUser(username, mode, settings)
      return { success: true } as SetUserResponse
    } catch (error) {
      return { success: false, message: (error as Error).message } as SetUserResponse
    }
  },
)

// ipc channel for logging in a user
// - expects a username and password
// - returns a success message and the user if the user was logged in successfully
// - returns an error message if the user was not logged in successfully
// - frontend must handle the response and display a relevant toast
ipcMain.handle('login-user', async (_, username: string, password: string) => {
  try {
    const user = await loginUser(username, password)
    return { success: true, user } as LoginUserResponse
  } catch (error) {
    return { success: false, message: (error as Error).message } as LoginUserResponse
  }
})

// ipc channel for getting settings for a mode
// - expects a username and mode
// - returns a success message and the settings if the settings were retrieved successfully
// - returns an error message if the settings were not retrieved successfully
// - frontend must handle the response and display a relevant toast
ipcMain.handle('get-settings-for-mode', async (_, username: string, mode: string) => {
  try {
    const settings = await getSettingsForMode(username, mode)
    return { success: true, settings } as ModeSettingResponse
  } catch (error) {
    return { success: false, message: (error as Error).message } as ModeSettingResponse
  }
})
