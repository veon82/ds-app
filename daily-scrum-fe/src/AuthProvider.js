import React, { createContext, useState } from 'react';
import { getUserFromJWT } from './jwtUtils';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem('token', token);
    const username = getUserFromJWT(token); // Assumi che questa funzione estragga l'username dal token
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    console.log("Checking token...");
    if (token) {
      console.log("token = " + token);
      const username = getUserFromJWT(token);
      if (username) {
        setUser(username); // Utente autenticato con token valido
      } else {
        logout(); // Token scaduto o non valido, esegui logout
      }
    }
    console.log("Done: token = " + token);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};
