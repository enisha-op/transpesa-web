import { motion } from "framer-motion"
import { Camera, Brain, Eye } from "lucide-react"

const technologies = [
  {
    id: 1,
    title: "Sensor de Fatiga",
    description:
      "Sistema avanzado de detección de fatiga del conductor mediante reconocimiento facial y análisis de patrones de comportamiento.",
    imageUrl: "Transporte/innovacionTec/sensorFatiga.jpg",
    icon: Eye,
  },
  {
    id: 2,
    title: "Cámara de video",
    description:
      "Registra actos inseguros del conductor y de otros conductores presentes en la vía, también ayuda en la investigación de accidentes.",
    imageUrl: "Transporte/innovacionTec/camaraVideo.jpg",
    icon: Camera,
  },
  {
    id: 3,
    title: "Copiloto Virtual",
    description:
      "Asistente inteligente que monitorea constantemente las condiciones de manejo y proporciona alertas en tiempo real.",
    imageUrl: "Transporte/innovacionTec/copilotoVirtual.webp",
    icon: Brain,
  },
]

// --- NUEVO Sub-componente para la tarjeta ---
// Este componente contiene la lógica para mostrar un diseño en móvil y otro en desktop.
const TechnologyCard = ({ tech, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* --- Versión Móvil (Estática) --- */}
      {/* Visible hasta el breakpoint 'md', luego se oculta */}
      <div className="md:hidden bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <img src={tech.imageUrl} alt={tech.title} className="w-full h-48 object-cover" />
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg mx-auto -mt-16 relative z-10 border-4 border-white">
            <tech.icon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">{tech.title}</h3>
          <p className="text-gray-800 leading-relaxed text-sm">{tech.description}</p>
        </div>
      </div>

      {/* --- Versión Desktop (Interactiva con Hover) --- */}
      {/* Oculta hasta 'md', luego se muestra */}
      <motion.div
        className="hidden md:block group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
        whileHover={{ y: -10 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
          style={{ backgroundImage: `url('${tech.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 rounded-2xl shadow-xl border border-gray-200 transition-opacity duration-300" />
        <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <tech.icon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-red-600 mb-4">{tech.title}</h3>
          <p className="text-gray-800 leading-relaxed text-sm">{tech.description}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-0">
          <h3 className="text-white text-xl font-bold text-center">{tech.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  )
}


export default function InnovacionTecnologica() {
  return (
    // 👇 CAMBIO: Espaciado responsive
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-600">Innovación</span> <span className="text-gray-900">Tecnológica</span>
        </motion.h2>

        {/* 👇 CAMBIO: Gap responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-8 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <TechnologyCard key={tech.id} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}