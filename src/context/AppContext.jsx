import {createContext, useEffect, useState} from "react";

export const AppContext = createContext({
    currentCity: 'г. Сим',
})

export const AppContextProvider = ({children}) => {
    const cityNow = localStorage.getItem("currentCity") ? localStorage.getItem("currentCity") : 'г. Сим';
    const [currentCity, setCurrentCity] = useState(cityNow);

    return (
        <AppContext.Provider value={{currentCity, setCurrentCity}}>
            {children}
        </AppContext.Provider>
    )
}