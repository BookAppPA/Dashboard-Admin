import React, { useEffect, useState } from "react";
import firebaseConfig from "../services/firebaseConfig";
import axios from 'axios'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged(async (user) => {
      user.getIdToken().then(data => {
        setToken(data);
      })
      setCurrentUser(user);
      setLoading(false);
    });
  }, [currentUser, token]);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <AuthContext.Provider value={{ currentUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};