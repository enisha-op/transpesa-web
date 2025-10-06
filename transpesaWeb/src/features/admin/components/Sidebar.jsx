import { NavLink, useNavigate } from "react-router-dom";
// 1. IMPORTA EL NUEVO ÍCONO
import { LayoutDashboard, FileText, Briefcase, Megaphone, LogOut, X, ChevronRight } from "lucide-react";

// 2. AÑADE EL NUEVO OBJETO AL ARRAY
const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/applications", label: "Formularios", icon: FileText },
  { to: "/admin/trabajos", label: "Puestos de Trabajo", icon: Briefcase },
  { to: "/admin/anuncios", label: "Anuncios", icon: Megaphone }, // <-- ENLACE AÑADIDO
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `group flex items-center justify-between gap-3 py-3 px-4 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30"
        : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:translate-x-1"
    }`;

  const sidebarContent = (
    <>
      <div>
        <div className="text-center mb-8 px-4 pt-6 pb-4 border-b border-gray-700/50">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3">
            <img src="/logo-transpesa-blanco.png" alt="Grupo Transpesa" className="mx-auto h-28 w-auto" />
          </div>
          <h1 className="text-lg font-bold text-white tracking-wide">Admin Panel</h1>
          <p className="text-xs text-gray-400 mt-1">Grupo Transpesa</p>
        </div>

        <nav className="flex flex-col gap-y-1.5 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/admin"}
              className={linkClasses}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-3 pb-6">
        <div className="bg-gray-700/30 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Administrador</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600/90 text-white py-2.5 px-4 rounded-xl hover:bg-red-600 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 font-medium text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex-col justify-between hidden md:flex sticky top-0 border-r border-gray-700/50">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col justify-between z-40 transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded-lg"
          aria-label="Cerrar menú"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebarContent}
      </aside>
    </>
  );
}