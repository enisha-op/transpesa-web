import Header from "@/components/header";
import Hero from "@/components/Hero";
import KeyStats from "@/features/transporte/components/KeyStats";
import WhyChooseUs from "../components/WhyChooseUs";
import QualitySection from "../../home/components/quality-section"; 
import TiposCargaSection from "../components/tipos-carga";
import InnovacionTecnologica from "../components/innovacion-tecnologica";
import StrategicPartners from "../../home/components/strategic-partners";

import Footer from "@/components/footer";


export default function TransportePage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
        <Header />
        <Hero 
          titleKey="heroTransport" 
          imageUrl="/transporteHero.jpg" 
          altText="Imagen Hero Transporte" 
        />
        <KeyStats />
        <WhyChooseUs />
        <QualitySection />
        <TiposCargaSection />
        <InnovacionTecnologica />
        <StrategicPartners />
        <Footer />
    </main>
  )
}