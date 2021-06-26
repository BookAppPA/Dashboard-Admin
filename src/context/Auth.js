import React, { useEffect, useState } from "react";
import firebaseConfig from "../services/firebaseConfig";
import axios from 'axios'
import Loading from '../components/loading';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged(async (user) => {
      if(user){
        user.getIdToken().then(data => {
          setToken(data);
        })
      }
      setCurrentUser(user);
      setLoading(false);
    });
  }, [currentUser, token]);
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <AuthContext.Provider value={{ currentUser, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};