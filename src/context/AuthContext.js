import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{

   const [user,setUser] = useState({})
   const [loading, setLoading] = useState(false)

   useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });

    unsub()

    // return () => {
    //   unsub();
    // };
  }, []);
   
    return(
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

