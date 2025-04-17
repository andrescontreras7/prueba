"use client"

import { useState } from "react"
import { Home, Users, Settings, Menu, X, BarChart2, FileText, Mail, LogOut } from "lucide-react"
import Link from "next/link"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Analytics", icon: BarChart2, href: "/dashboard" },
    { name: "Documents", icon: FileText, href: "/dashboard" },
    { name: "Messages", icon: Mail, href: "/dashboard" },
    { name: "Users", icon: Users, href: "/dashboard" },
    { name: "settings", icon: Settings, href: "/dashboard" },
    { name: "Logout", icon: LogOut, href: "/dashboard"   },
    
  ]

  return (
    <>
  
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden">
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>


      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
    
          <div className="px-6 py-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Mi Aplicación</h2>
          </div>


          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors group"
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>


          <div className="px-6 py-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Users size={16} className="text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Usuario</p>
                <p className="text-xs text-gray-500">usuario@ejemplo.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

   
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />}
    </>
  )
}

export default Sidebar
