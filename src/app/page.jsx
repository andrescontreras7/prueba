"use client";

import { AuthContext } from "@/context/AuthContext";
import LoginView from "@/modules/login/LoginView";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";

const page = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // 🆕
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setMessage("Please enter a valid email address.");
        setButtonDisabled(true);
        return;
      } else {
        setMessage("");
      }
    }

    if (name === "password") {
      if (value.length < 2) {
        setMessage("La contraseña debe tener al menos 2 caracteres.");
        setButtonDisabled(true);
        return;
      } else {
        setMessage("");
      }
    }

    const updatedData = { ...data, [name]: value };
    setData(updatedData);

    if (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedData.email) &&
      updatedData.password?.length >= 2
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      setMessage("");
      if (result.success) {
        router.push("/dashboard");
      } else {
        setMessage(result.message || "Credenciales inválidas.");
      }
    } catch (error) {
      setMessage("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginView
      message={message}
      buttonDisabled={buttonDisabled || loading}
      loading={loading}
      onSubmit={onSubmit}
      handleChange={handleChange}
    />
  );
};

export default page;
