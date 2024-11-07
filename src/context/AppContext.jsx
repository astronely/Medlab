import {createContext, useState} from "react";

export const AppContext = createContext({
    currentCity: '',
    serverAddress: ''
})

export const AppContextProvider = ({children}) => {
    const cityNow = localStorage.getItem("currentCity") ? localStorage.getItem("currentCity") : '';
    const [currentCity, setCurrentCity] = useState(cityNow);
    const [serverAddress, setServerAddress] = useState(`${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_SERVER}`);

    return (
        <AppContext.Provider value={{currentCity, setCurrentCity,
                                    serverAddress, setServerAddress}}>
            {children}
        </AppContext.Provider>
    )
}