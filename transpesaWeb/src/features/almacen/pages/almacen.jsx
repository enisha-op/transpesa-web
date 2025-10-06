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


export default function AlmacenPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
        <Header />
        <Hero 
          titleKey="heroStorage" 
          imageUrl="/almacenajeHero.jpg" 
          altText="Imagen Hero Almacén" 
        />
        <AboutAltraSection />
        <FeaturesSection />
        <QualitySection />
        <TiposAlmacenesSection />
        <LocationsSection />
        <TeamSection />
        <StrategicPartners />
        <Footer />
    </main>
  )
}
