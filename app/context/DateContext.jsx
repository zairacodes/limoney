import { useState, createContext, useEffect } from 'react';
import { doc, onSnapshot, updateDoc} from 'firebase/firestore'
import { db } from '../src/config/firebase'

export const DateContext = createContext();

export const DateProvider = ({children}) => {
    const [date, setDate] = useState({
        day: 1,
        month: 'January',
        year: 2025
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, 'users', 'vSHbPyV82Y4As0rEVWJG'), (doc) => {
                if(doc.exists()) {
                    console.log('exists');
                    const data = doc.data()
                    setDate({
                        day: data.currentDate.day,
                        month: data.currentDate.month,
                        year: data.currentDate.year
                    })
                    setLoading(false)
                }
            }
        )
        return () => unsub()
    }, [])

    return (<DateContext.Provider value={{date, setDate}}>
        {children}
    </DateContext.Provider>)
}