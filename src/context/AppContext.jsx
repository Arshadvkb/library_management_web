import { createContext, useState, useEffect } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  // Initialize state from localStorage if available
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn');
    return saved ? JSON.parse(saved) : false;
  });

  const [userData, setuserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);

  // Wrap the setuserData to handle both state and localStorage
  const handleSetUserData = (data) => {
    setuserData(data);
    if (data) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem('userData');
      localStorage.removeItem('isLoggedIn');
    }
  };

  const logout = () => {
    handleSetUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
  };

  const value = {
    backendurl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setuserData: handleSetUserData,
    logout
  };

  console.log('AppContext value:', value);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
