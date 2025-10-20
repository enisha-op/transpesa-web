import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react" // <-- 1. IMPORTA useEffect

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
import JobsPage from "@/features/admin/pages/JobsPage"
import ApplicationsPage from "@/features/admin/pages/ApplicationsPage"
import AnunciosPage from "./features/admin/pages/AnunciosPage"
import BlogPageAdmin from "./features/admin/pages/BlogPageAdmin"
import ContactoFormPage from "./features/admin/pages/ContactoFormPage"

import "leaflet/dist/leaflet.css"

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // La lógica inicial para decidir si mostrar el loader se mantiene
    return !sessionStorage.getItem("hasLoadedBefore")
  })

  // --- 2. AÑADE ESTE useEffect PARA SINCRONIZAR LA CARGA ---
  useEffect(() => {
    // Si no necesitamos mostrar el loader, no hacemos nada.
    if (!isLoading) return;

    // Creamos una promesa que se resolverá cuando la imagen del Hero haya cargado.
    const imageLoadPromise = new Promise(resolve => {
      const img = new Image();
      img.src = '/camion1.webp'; // La imagen importante que queremos precargar
      img.onload = resolve;
      img.onerror = resolve; // Resolvemos incluso si hay un error para no bloquear la app
    });

    // Creamos una promesa que se resolverá después de un tiempo mínimo (ej. 2 segundos).
    // Esto asegura que la animación de tu LoadingScreen tenga tiempo de ejecutarse.
    const minTimePromise = new Promise(resolve => {
      setTimeout(resolve, 2000); // 2000ms = 2 segundos
    });

    // Promise.all espera a que AMBAS promesas se completen.
    Promise.all([imageLoadPromise, minTimePromise]).then(() => {
      sessionStorage.setItem("hasLoadedBefore", "true");
      setIsLoading(false);
    });

  }, [isLoading]); // Se ejecutará solo cuando el estado `isLoading` cambie.


  // --- 3. SIMPLIFICAMOS EL RENDERIZADO ---
  // El componente App ahora controla cuándo se oculta el LoadingScreen.
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopButton />
      <AnuncioModal />
      <Routes>
        {/* --- TUS RUTAS (SIN CAMBIOS) --- */}
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

        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="trabajos" element={<JobsPage />} />
          <Route path="anuncios" element={<AnunciosPage />} />
          <Route path="blog" element={<BlogPageAdmin />} />
          <Route path="contacts" element={<ContactoFormPage />} />
        </Route>
        
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  )
}

export default App