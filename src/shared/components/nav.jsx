import { useState } from "react";
import {
  Menu,
  Search,
  UserCircle,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";

export default function NavBar({logout, email}) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="hidden sm:flex space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
              <input
                placeholder="Search"
                className="pl-10 p-2 m-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center space-x-1 hover:text-blue-500 text-gray-700 dark:text-gray-200"
              >
                <UserCircle className="h-7 w-7" />
                <ChevronDown className="h-4 w-4" />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <div className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-800 dark:text-gray-100 font-medium">
                     {email  || "User"}
                    </p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Settings className="w-4 h-4 mr-2" /> Settings
                      </a>
                    </li>
                    <li>
                      <button
                      onClick={logout}
                        
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}