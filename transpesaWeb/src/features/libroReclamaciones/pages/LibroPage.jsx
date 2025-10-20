import Header from "@/components/header";
import Hero from "@/components/Hero";

import Footer from "@/components/footer";
import LibroReclamacionesPage from "./LibroReclamacionesPage";


export default function LibroPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
        <Header />
        <Hero 
          titleKey="heroLibroReclamaciones" 
          imageUrl="/imageHero.webp" 
          altText="Imagen Hero Nosotros" 
        />
        <LibroReclamacionesPage />
        <Footer />
    </main>
  )
}