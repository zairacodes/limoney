import { createContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc} from 'firebase/firestore'
import { db } from '../src/config/firebase'
import { AppState } from "react-native";

export const DaysPlayedContext = createContext()

export const DaysPlayedProvider = ({children}) => {
    const [daysPlayed, setDaysPlayed] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, 'users', 'vSHbPyV82Y4As0rEVWJG'), (doc) => {
                if(doc.exists()) {
                    console.log('exists');
                    const data = doc.data()
                    setDaysPlayed(data.daysPlayed)
                    setLoading(false)
                }
            }
        )
        return () => unsub()
    }, [])

    return (
        <DaysPlayedContext.Provider value={{ daysPlayed, setDaysPlayed}}>
            {children}
        </DaysPlayedContext.Provider>
    )
}