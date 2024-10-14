import { join } from 'path'
import { promises as fs } from 'fs'
import * as argon2 from 'argon2'
import { app } from 'electron'

const usersFilePath = join(app.getPath('userData'), 'users.json')

interface User {
  username: string
  passwordHash: string
  serialNumber: string
}

export async function ensureUsersFile(filePath: string): Promise<void> {
  try {
    await fs.access(filePath)
    console.log(`Users file exists at: ${filePath}`)
  } catch (error) {
    if ((error as { code: string }).code === 'ENOENT') {
      await fs.writeFile(filePath, JSON.stringify([]))
      console.log(`Created users file at: ${filePath}`)
    } else {
      throw error
    }
  }
}

async function getUsers(filePath: string): Promise<User[]> {
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

async function saveUser(users: User[]): Promise<void> {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2))
}

export async function registerUser(
  username: string,
  password: string,
  serialNumber: string,
): Promise<void> {
  console.log(`registerUser called with: ${username}, ${password}, ${serialNumber}`)
  const users = await getUsers(usersFilePath)
  if (users.some((user) => user.username === username)) {
    throw new Error('User already exists')
  }

  const passwordHash = await argon2.hash(password)
  const newUser: User = { username, passwordHash, serialNumber }

  users.push(newUser)
  await saveUser(users)
  console.log(`User registered: ${username}`)
}
