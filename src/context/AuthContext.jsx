"use client";

import { fetchSinToken } from "@/helpers/fetch";
import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

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

      if (!resp || !resp.token) {
        return {
          success: false,
          message: "Error al iniciar sesión. Inténtalo más tarde.",
        };
      }

      // Guardado de expiracion dee token
      Cookies.set("token", resp.token, { expires: 1 });
      Cookies.set("token_expiration", Date.now() + 24 * 60 * 60 * 1000);

      const { user } = resp;

      setAuth({
        uid: user.id,
        checking: false,
        logged: true,
        name: user.email,
        email: user.email,
      });

      return { success: true };
    } catch (error) {
      const isInvalidCreds = error.message === "Invalid credentials";
      return {
        success: false,
        message: isInvalidCreds
          ? "Credenciales incorrectas. Por favor, verifica tu correo y contraseña."
          : "Ocurrió un error inesperado. Por favor, inténtalo mas tarde.",
      };
    }
  };

  const logout = () => {
    try {
      Cookies.remove("token");
      Cookies.remove("token_expiration");

      setAuth({
        checking: false,
        logged: false,
      });
    } catch (error) {
      console.error(
        "Error al cerrar sesión:",
        error.message || "Error desconocido"
      );
    }
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
