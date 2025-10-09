import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"

// --- Componente de Carga ---
import LoadingScreen from "./components/LoadingScreen"

// --- Páginas Públicas ---
import HomePage from "@/features/home/pages/home"
import AboutPage from "@/features/aboutUs/pages/about"
import ServicePage from "@/features/services/pages/services"
import TransportePage from "@/features/transporte/pages/transporte"
import AlmacenPage from "./features/almacen/pages/almacen"
import ContactPage from "./features/contact/pages/Contact"
import TrabajaCnPage from "./features/trabajaConNosotros/pages/TrabajaCN"
import LibroPage from "./features/libroReclamaciones/pages/LibroPage"
import TerminosCondicionesPage from "./features/terminosCondiciones/pages/TerminosCondicionesPage"
import BlogPage from "./features/blog/pages/BlogPage"
import SinglePostPage from "./features/blog/pages/SinglePostPage"
import AnuncioModal from "./components/AnuncioModal"


// --- Componentes Globales ---

import ScrollToTop from "./components/ScrollToTop"
import ScrollToTopButton from "./components/ScrollToTopButton"

// --- Páginas y Componentes del Admin ---
import LoginPage from "../src/features/admin/LoginPage"
import AdminLayout from "../src/features/admin/components/AdminLayout"
import DashboardPage from "../src/features/admin/pages/DashboardPage"
// import FormsPage from "@/features/admin/pages/FormsPage"
import JobsPage from "@/features/admin/pages/JobsPage"
import ApplicationsPage from "@/features/admin/pages/ApplicationsPage"
import AnunciosPage from "./features/admin/pages/AnunciosPage"
import BlogPageAdmin from "./features/admin/pages/BlogPageAdmin"
import ContactoFormPage from "./features/admin/pages/ContactoFormPage"

// Para el mapa de Leaflet
import "leaflet/dist/leaflet.css"

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("hasLoadedBefore")
  })

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasLoadedBefore", "true")
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />
      <AnuncioModal />
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/transporte" element={<TransportePage />} />
        <Route path="/almacenaje" element={<AlmacenPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaCnPage />} />
        <Route path="/libro-de-reclamaciones" element={<LibroPage />} />
        <Route path="/terminos-y-condiciones" element={<TerminosCondicionesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SinglePostPage />} />


        {/* --- RUTAS DE AUTENTICACIÓN Y ADMIN --- */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          {/* <Route path="formularios" element={<FormsPage />} /> */}
          <Route path="trabajos" element={<JobsPage />} />
          <Route path="anuncios" element={<AnunciosPage />} />
          <Route path="blog" element={<BlogPageAdmin />} />
          <Route path="contacts" element={<ContactoFormPage />} />

        </Route>

        {/* --- RUTA PARA PÁGINAS NO ENCONTRADAS (OPCIONAL) --- */}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  )
}

export default App
