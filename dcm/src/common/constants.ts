import { join } from 'path'
import { app } from 'electron'

export const usersFilePath = join(app.getPath('userData'), 'users.json')
