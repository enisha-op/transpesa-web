import { ShieldCheck, MonitorSmartphone, Boxes, BrainCircuit } from "lucide-react"

// Componente para cada una de las características (ícono, título, descripción)
const FeatureItem = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
      <div className="mb-6 p-4 bg-red-50 rounded-full">
        <Icon className="h-12 w-12 text-red-600" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-xs">{description}</p>
    </div>
  )
}

// Componente principal de la sección
export default function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Seguridad 24/7",
      description: "Vigilancia constante y protocolos que protegen tu mercadería en todo momento.",
    },
    {
      icon: MonitorSmartphone,
      title: "Monitoreo Inteligente",
      description: "Control en tiempo real con cámaras y sensores de última generación.",
    },
    {
      icon: Boxes,
      title: "Espacios Flexibles",
      description: "Áreas amplias y adaptables para diferentes tipos de productos.",
    },
    {
      icon: BrainCircuit,
      title: "Tecnología Avanzada",
      description: "Software que optimiza tus inventarios y procesos logísticos.",
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Línea decorativa superior */}
        <div className="flex justify-center mb-16">
          <div className="h-1 w-20 bg-red-600" />
        </div>

        {/* Grilla responsiva para las características */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureItem
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Línea decorativa inferior */}
        <div className="flex justify-center mt-16">
          <div className="h-1 w-20 bg-red-600" />
        </div>
      </div>
    </section>
  )
}
