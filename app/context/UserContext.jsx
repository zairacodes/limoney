import { createContext, useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../src/config/firebase';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        "username": "Blalalala",
        "personalBalance": 2000,
        "businessBalance": 0,
        "totalProfit": 0
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'users', 'vSHbPyV82Y4As0rEVWJG'), (doc) => {
            if (doc.exists()) {
              const data = doc.data()
              console.log(data.username);
              setUser({
                username: data.username,
                accountBalance: data.accountBalance,
                lemonCount: data.lemonCount,
                sugarCount: data.sugarCount,
                waterCount: data.waterCount,
                totalProfit: data.totalProfit
              })
              setLoading(false)
            }
        })
        return () => unsub()
    }, [])

    return (<UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>)
}