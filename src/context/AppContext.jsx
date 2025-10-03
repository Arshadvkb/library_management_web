import { createContext, useState } from "react";

export const AppContext=createContext


 export const AppContextProvider=(props)=>{
    const backendurl=import.meta.env.VITE_BACKED_URL
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [userData,setuserData]=useState(false)
    const value={
        backendurl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setuserData
    }
    return(
       <AppContext.Provider value={value}>
        {props.children}
       </AppContext.Provider>
    )

}

