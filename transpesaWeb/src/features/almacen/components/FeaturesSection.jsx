import { ShieldCheck, MonitorSmartphone, Boxes, BrainCircuit } from "lucide-react"
import { motion } from "framer-motion" // 1. Importa motion

// 2. Convierte FeatureItem en un componente de 'motion' y añade efecto hover
const FeatureItem = ({ icon: Icon, title, description, variants }) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center p-6 rounded-lg transition-colors duration-300"
      variants={variants}
      whileHover={{ y: -8, backgroundColor: "rgba(249, 250, 251, 1)", transition: { type: 'spring', stiffness: 300 } }}
    >
      <motion.div 
        className="mb-6 p-4 bg-red-50 rounded-full"
        // Efecto hover anidado para el ícono
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon className="h-12 w-12 text-red-600" strokeWidth={1.5} />
      </motion.div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-xs">{description}</p>
    </motion.div>
  )
}

// Componente principal de la sección
export default function FeaturesSection() {
  const features = [
    { icon: ShieldCheck, title: "Seguridad 24/7", description: "Vigilancia constante y protocolos que protegen tu mercadería en todo momento." },
    { icon: MonitorSmartphone, title: "Monitoreo Inteligente", description: "Control en tiempo real con cámaras y sensores de última generación." },
    { icon: Boxes, title: "Espacios Flexibles", description: "Áreas amplias y adaptables para diferentes tipos de productos." },
    { icon: BrainCircuit, title: "Tecnología Avanzada", description: "Software que optimiza tus inventarios y procesos logísticos." },
  ]

  // 3. Define las variantes para la animación escalonada
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 4. Anima la línea decorativa superior */}
        <div className="flex justify-center mb-16">
          <motion.div 
            className="h-1 w-20 bg-red-600" 
            initial={{ scaleX: 0, originX: 0.5 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* 5. Anima el contenedor de la grilla para orquestar la animación */}
        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <FeatureItem
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variants={itemVariants} // Pasa las variantes al componente hijo
            />
          ))}
        </motion.div>

        {/* 6. Anima la línea decorativa inferior */}
        <div className="flex justify-center mt-16">
          <motion.div 
            className="h-1 w-20 bg-red-600" 
            initial={{ scaleX: 0, originX: 0.5 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  )
}