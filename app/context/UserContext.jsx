import { createContext, useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../src/config/firebase'
import { AppState } from 'react-native'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'Blalalala',
    accountBalance: 2000,
    totalProfit: 0,
    lemonCount: 0,
    sugarCount: 0,
    waterCount: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'users', 'vSHbPyV82Y4As0rEVWJG'),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data()
          setUser({
            username: data.username,
            accountBalance: data.accountBalance,
            lemonCount: data.lemonCount,
            sugarCount: data.sugarCount,
            waterCount: data.waterCount,
            totalProfit: data.totalProfit,
          })
          setLoading(false)
        }
      }
    )
    return () => unsub()
  }, [])

  const updateUserDataInFirebase = async (reason) => {
    const userRef = doc(db, 'users', 'vSHbPyV82Y4As0rEVWJG')
    await updateDoc(userRef, user)
    console.log(`User data updated in Firebase due to: ${reason}`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateUserDataInFirebase('interval')
    }, 60000)

    return () => clearInterval(interval)
  }, [user])

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background') {
        updateUserDataInFirebase('background')
      } else if (nextAppState === 'inactive') {
        updateUserDataInFirebase('inactive')
      }
    }

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return () => {
      subscription.remove()
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
