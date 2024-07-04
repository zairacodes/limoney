import React, { createContext, useEffect, useState } from 'react'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../src/config/firebase'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'Blalalala',
    accountBalance: 2000,
    totalProfit: 0,
    lemonCount: 0,
    sugarCount: 0,
    waterCount: 0,
    lemonadeInStock: 0,
  })
  const [loading, setLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user')
        if (jsonValue != null) {
          setUser(JSON.parse(jsonValue))
          setLoading(false)
        }
      } catch (e) {
        console.error('Failed to load user data from storage', e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
      if (state.isConnected) {
        const unsub = onSnapshot(
          doc(db, 'users', '2VYQnKwksn9qH3wehHR5'),
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
                lemonadeInStock: data.lemonadeInStock,
              })
              setLoading(false)
              console.log('User data fetched from Firebase')
            }
          }
        )
        return () => unsub()
      } else {
        console.log('No internet connection, using local storage data')
      }
    })
    return () => unsubscribe()
  }, [isConnected])

  const updateUserData = async (reason) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
      console.log(`User data saved locally due to: ${reason}`)
      if (isConnected) {
        const userRef = doc(db, 'users', '2VYQnKwksn9qH3wehHR5')
        await updateDoc(userRef, user)
        console.log(`User data updated in Firebase due to: ${reason}`)
      }
    } catch (e) {
      console.error('Failed to update user data', e)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateUserData('interval')
    }, 60000)

    return () => clearInterval(interval)
  }, [user])

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        updateUserData(nextAppState)
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
