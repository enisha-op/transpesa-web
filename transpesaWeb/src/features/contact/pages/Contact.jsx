import Header from "@/components/header";
import Hero from "@/components/Hero";
import ContactSection from "../components/ContactSection";
import BranchesSection from "../components/BranchesSection";
import Footer from "@/components/footer";


export default function ContactPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
        <Header />
        <Hero 
          titleKey="heroContact" 
          imageUrl="/contacto.jpg" 
          altText="Imagen Hero Contacto" 
        />
        <ContactSection />  
        <BranchesSection />
        <Footer />
    </main>
  )
}
