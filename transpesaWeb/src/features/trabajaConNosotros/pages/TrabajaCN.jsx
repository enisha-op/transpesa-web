
import { useRef, useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/Hero"
import JobOpeningsSection from "../components/JobOpeningsSection"
import ApplicationSection from "../components/ApplicationSection"
import Footer from "@/components/footer"

export default function TrabajaCnPage() {
  const [selectedJob, setSelectedJob] = useState(null)
  const applicationRef = useRef(null)

  const handleJobSelect = (job) => {
    setSelectedJob(job)
    // Smooth scroll to application form
    setTimeout(() => {
      applicationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  return (
    <main className="min-h-screen relative">
      <Header />
      <Hero titleKey="heroWorkWithUs" imageUrl="/images/image1.jpg" altText="Imagen Hero Trabaja con Nosotros" />
      <JobOpeningsSection onJobSelect={handleJobSelect} />
      <ApplicationSection ref={applicationRef} selectedJob={selectedJob} />
      <Footer />
    </main>
  )
}
