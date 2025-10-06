import { Outlet } from "react-router-dom"
import { useState } from "react"
import { Menu } from "lucide-react"
import Sidebar from "./Sidebar"

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <header className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Abrir menú"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-2 rounded-lg shadow-md">
                <Menu className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900">Admin Panel</span>
                <span className="text-xs text-gray-500">Grupo Transpesa</span>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                AD
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
