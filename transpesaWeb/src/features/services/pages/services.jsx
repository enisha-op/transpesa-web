import Header from "@/components/header";
import Hero from "@/components/Hero";
import BusinessLines from "../components/BusinessLines";
import Footer from "@/components/footer";


export default function ServicePage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
        <Header />
        <Hero 
          titleKey="heroServices" 
          imageUrl="/servicios.jpg" 
          altText="Imagen Hero Servicios" 
        />
        <BusinessLines />
        <Footer />
    </main>
  )
}