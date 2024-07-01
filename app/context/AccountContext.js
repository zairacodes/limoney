import React, { createContext, useState } from 'react'

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {
  const [accBalance, setAccBalance] = useState(500)

  return (
    <AccountContext.Provider value={{ accBalance, setAccBalance }}>
      {children}
    </AccountContext.Provider>
  )
}
