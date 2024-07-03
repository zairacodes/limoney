import { useState, createContext } from 'react';

export const DateContext = createContext();

export const DateProvider = ({children}) => {
    const [date, setDate] = useState({
        day: 1,
        month: 'January',
        year: 2025
    })
    return (<DateContext.Provider value={{date, setDate}}>
        {children}
    </DateContext.Provider>)
}