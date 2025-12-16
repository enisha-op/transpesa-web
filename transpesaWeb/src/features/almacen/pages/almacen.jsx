import Header from "@/components/header";
import Hero from "@/components/Hero";
import AboutAltraSection from "../components/AboutAltraSection";
import FeaturesSection from "../components/FeaturesSection";
import QualitySection from "../../home/components/quality-section";
import TiposAlmacenesSection from "../components/TiposAlmacenes";
import LocationsSection from "../../home/components/locations-section"
import TeamSection from "../../home/components/team-section";
import StrategicPartners from "../../home/components/strategic-partners";


import Footer from "@/components/footer";
import SecondaryNavAlmacen from "../components/SecondaryNavAlmacen"; 

export default function AlmacenPage() {
  return (
    <main className="min-h-screen relative"> 
        <Header />
        <Hero 
          titleKey="heroStorage" 
          imageUrl="/Inicio/Almacen.png" 
          altText="Imagen Hero Almacén" 
        />
        <SecondaryNavAlmacen />

        <section id="nosotros-almacen">
          <AboutAltraSection />
        </section>

        <section id="caracteristicas-almacen">
          <FeaturesSection />
        </section>

        {/* <section id="calidad-almacen">
          <QualitySection />
        </section> */}

        <section id="tipos-almacenes">
          <TiposAlmacenesSection />
        </section>

        <section id="ubicaciones-almacen">
          <LocationsSection />
        </section>

        <section id="equipo-almacen">
          <TeamSection />
        </section>
        
        <section id="aliados-almacen">
          <StrategicPartners />
        </section>
        
        <Footer />
    </main>
  )
}