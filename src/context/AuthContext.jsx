"use client";

import { fetchSinToken } from "@/helpers/fetch";
import React, { createContext, useCallback, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
  };

  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    try {
      const resp = await fetchSinToken("login", { email, password }, "POST");
      if (resp.message && resp.message === "Invalid credentials") {
        console.error("Error en login:", resp.message);
        return false;
      }

      localStorage.setItem("token", resp.token);
      const { user } = resp;

      setAuth({
        uid: user.id,
        checking: false,
        logged: true,
        name: user.email,
        email: user.email,
      });

      return true;
    } catch (error) {
      console.error("Error en login:", error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    
    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
