import { createContext, useState } from "react";

export const AppContext=createContext(null)


 export const AppContextProvider=(props)=>{
    const backendurl=import.meta.env.VITE_BACKEND_URL
   
    
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [userData,setuserData]=useState(null)
    const value={
        backendurl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setuserData
    }
    console.log(value);
    
    return(
       <AppContext.Provider value={value}>
        {props.children}
       </AppContext.Provider>
    )

}

