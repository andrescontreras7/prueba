"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Cookies from "js-cookie";
import Nav from "../../shared/components/nav";
import Sidebar from "@/shared/components/sidebar";

export function DashboardLayout({ children }) {
  const { auth, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("No hay token. Redirigiendo a la página de inicio...");
      router.push("/");
      return;
    }

    const tokenExpiration = Cookies.get("token_expiration");
    const currentTime = Date.now();

    if (tokenExpiration && currentTime > parseInt(tokenExpiration, 10)) {
      console.warn("El token ha expirado. Eliminando token y redirigiendo...");
      Cookies.remove("token");
      Cookies.remove("token_expiration");
      router.push("/");
    }
  }, [auth, router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "ml-0 md:ml-64"
        }`}
      >
        <Nav logout={logout} email={auth.email} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
