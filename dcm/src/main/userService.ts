import { promises as fs } from 'fs'
import * as argon2 from 'argon2'
import { usersFilePath } from '../common/constants'
import type { PublicUser, User } from '../common/types'

export async function ensureUsersFile(filePath: string): Promise<void> {
  try {
    await fs.access(filePath)
  } catch (error) {
    if ((error as { code: string }).code === 'ENOENT') {
      await fs.writeFile(filePath, JSON.stringify([]))
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
  const users = await getUsers(usersFilePath)
  if (users.some((user) => user.username === username)) {
    throw new Error('User already exists')
  }

  const passwordHash = await argon2.hash(password)
  const newUser: User = { username, passwordHash, serialNumber }

  users.push(newUser)
  await saveUser(users)
}

export async function loginUser(username: string, password: string): Promise<PublicUser> {
  const users = await getUsers(usersFilePath)
  const user = users.find((u) => u.username === username)
  if (!user) {
    throw new Error('User not found')
  }

  if (!(await argon2.verify(user.passwordHash, password))) {
    throw new Error('Incorrect password')
  }

  return { username, serialNumber: user.serialNumber }
}
