import Header from "@/components/header";
import Hero from "@/components/Hero";
import KeyStats from "@/features/transporte/components/KeyStats";
import WhyChooseUs from "../components/WhyChooseUs";
import QualitySection from "../../home/components/quality-section"; 
import TiposCargaSection from "../components/tipos-carga";
import InnovacionTecnologica from "../components/innovacion-tecnologica";
import StrategicPartners from "../../home/components/strategic-partners";

import Footer from "@/components/footer";

import SecondaryNavTransporte from "../components/SecondaryNavTransporte"; 


export default function TransportePage() {
  return (
    <main className="min-h-screen relative"> {/* Quitamos overflow-x-hidden para que el sticky funcione */}
      <Header />
      <Hero 
        titleKey="heroTransport" 
        imageUrl="/Inicio/Transporte.webp" 
        altText="Imagen Hero Transporte" 
      />

      <SecondaryNavTransporte />

      <section id="datos-clave">
        <KeyStats />
      </section>

      <section id="ventajas">
        <WhyChooseUs />
      </section>

      <section id="calidad">
        <QualitySection />
      </section>

      <section id="tipos-carga">
        <TiposCargaSection />
      </section>
      
      <section id="tecnologia">
        <InnovacionTecnologica />
      </section>

      <section id="aliados">
        <StrategicPartners />
      </section>

      <Footer />
    </main>
  )
}