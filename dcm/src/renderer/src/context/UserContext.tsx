import { createContext, useState, useContext, ReactNode } from 'react'
import { PublicUser } from 'src/common/types'

interface UserContextType {
  user: PublicUser | undefined
  setUser: (user: PublicUser | undefined) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<PublicUser | undefined>(undefined)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
