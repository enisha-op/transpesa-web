import Header from "@/components/header";
import Hero from "@/components/Hero";
import AboutSection from "../components/AboutSection";
import ModernValues from "../components/ModernValues";
import PillarsSection from "../../home/components/pilars-section";
import ManagerMessage from "../components/ManagerMessage";
import HistoryTimeline from "../components/HistoryTimeline";
import StatsFooter from "../../home/components/stats-footer";
import TeamSection from "../../home/components/team-section";
import Footer from "@/components/footer";


export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
        <Header />
        <Hero 
          titleKey="heroAboutUs" 
          imageUrl="/imageHero.jpg" 
          altText="Imagen Hero Nosotros" 
        />
        <AboutSection />
        <ModernValues />
        <PillarsSection />
        <ManagerMessage />
        <section id="timeline">
          <HistoryTimeline />
        </section>
        <StatsFooter />
        <TeamSection />
        <Footer />
    </main>
  )
}