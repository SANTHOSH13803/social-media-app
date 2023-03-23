import React, { useEffect, useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState({});
  useEffect(() => {
    const onUserLogin = onAuthStateChanged(auth, (user) => {
      setCurrentuser(user);
    });
    return () => {
      onUserLogin();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
