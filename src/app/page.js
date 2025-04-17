"use client";

import { AuthContext } from "@/context/AuthContext";
import LoginView from "@/modules/login/LoginView";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useContext } from "react";

const page = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name === "email") {
      if (!value.includes("@")) {
        setMessage("Please enter a valid email address");
        setButtonDisabled(true);
      } else {
        setMessage("");
      }
    }

    if (name === "password") {
      if (value.length < 2) {
        setMessage("Password must be at least 6 characters long");
        setButtonDisabled(true);
      } else {
        setMessage("");
      }
    }

    const updatedData = { ...data, [name]: value };
    setData(updatedData);

    if (updatedData.email?.includes("@") && updatedData.password?.length >= 2) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };
  const onSubmit = async () => {
    try {
      const ok = await login(data.email, data.password);
      console.log(ok);
      setMessage("");
      if (ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setMessage("Invalid credentials");
    }
  };

  return (
    <LoginView
      message={message}
      buttonDisabled={buttonDisabled}
      onSubmit={onSubmit}
      handleChange={handleChange}
    />
  );
};

export default page;
