import Header from "@/components/header";
import HeroSection from "@/features/home/components/hero-section";
import SecondaryNav from "../components/secondary-nav";
import ContentSection from "../components/content-section";
import StatsFooter from "../components/stats-footer";
import ServicesSection from "../components/services-section";
import PillarsSection from "../components/pilars-section";
import QualitySection from "../components/quality-section";
import VisionSection from "../components/vision-section";
import TeamSection from "../components/team-section";
import StrategicLocationsSection from "../../almacen/components/StrategicLocationsSection";
import StrategicPartners from "../components/strategic-partners";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Header />
      <HeroSection />
      <SecondaryNav />

      {/* 👇 AQUÍ EMPIEZAN LOS CAMBIOS. Añadimos un 'id' a cada sección */}
      <section id="descripcion">
        <ContentSection />
      </section>

      {/* Este no tiene un enlace en el nav, así que no necesita id */}
      <StatsFooter /> 

      <section id="servicios">
        <ServicesSection />
      </section>

      <section id="pilares">
        <PillarsSection />
      </section>

      <section id="certificaciones">
        <QualitySection />
      </section>

      {/* Este no tiene un enlace en el nav, así que no necesita id */}
      <VisionSection />

      <section id="equipo">
        <TeamSection />
      </section>

      {/* Este no tiene un enlace en el nav, así que no necesita id */}
      <StrategicLocationsSection />


      <section id="aliados">
        <StrategicPartners />
      </section>

      <Footer />
    </main>
  )
}