import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

//function for user's remain in account
const useSessionTimeout=(logout, timeout=3600000)=>{
  useEffect(()=>{
    const timer=setTimeout(logout,timeout);

    return()=>clearTimeout(timer);
  },[logout,timeout])
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  
  useEffect(()=>{
    const storedUser=localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  },[]);

  const login = (userData) => {
    console.log("Logging in user, userData received: ", userData)
    localStorage.setItem('user', JSON.stringify(userData)); //save user data
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user'); //remove user data
    setUser(null);
  };

  useSessionTimeout(logout);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
