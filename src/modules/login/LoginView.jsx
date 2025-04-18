"use client";

import { useRouter } from "next/navigation";
import React, { memo, useEffect } from "react";

const LoginView = ({
  message,
  handleChange,
  onSubmit,
  buttonDisabled,
  loading,
}) => {
  const router = useRouter();


  
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      console.info("Sesión activa encontrada. Redirigiendo al dashboard...");
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="bg-gradient-to-b from-blue-500 to-blue-900 md:w-[60%] w-full h-full flex items-center justify-center p-4">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white">GoFinance</h1>
          <p className="text-white">
            The most popular peer-to-peer lending of SEA
          </p>
          <button className="bg-blue-500 rounded-full text-white p-2 w-3/4 md:w-1/2 mx-auto md:mx-0 mt-4 hover:bg-gray-200 transition duration-200">
            Read more
          </button>
        </div>
      </div>

      <div className="bg-white md:w-[40%] w-full h-full flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-3xl font-bold text-gray-700 text-center">
            Hello Again
          </h1>
          <h2 className="text-gray-500 text-center">Welcome back!</h2>

          <input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Email Address"
            className="border-2 text-gray-800 border-gray-300 rounded-full p-2 w-3/4 md:w-1/2 mt-4"
          />

          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 text-gray-800 border-gray-300 rounded-full p-2 w-3/4 md:w-1/2 mt-4"
          />

          {message && (
            <p className="text-red-500 text-center mt-2">{message}</p>
          )}

          <button
            onClick={onSubmit}
            disabled={buttonDisabled}
            className={`bg-blue-500 text-white rounded-md p-2 w-3/4 md:w-1/2 mt-4 transition duration-200 ${
              buttonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Cargando..." : "Login"}
          </button>

          <p className="text-gray-600 mt-2 text-center">Forgot password?</p>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginView);
