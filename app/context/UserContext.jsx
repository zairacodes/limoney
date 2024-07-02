import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        "username": "QueenBarbara",
        "personalBalance": 2000,
        "businessBalance": 0,
        "totalProfit": 0
    })
    return (<UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>)
}