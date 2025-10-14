import { Zap, ShieldCheck, Recycle, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion'; // 1. Importa motion

const features = [
  {
    icon: <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />,
    title: 'Eficiencia Operativa',
    description: 'Procesos ágiles que aseguran entregas rápidas y confiables.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />,
    title: 'Seguridad Integral',
    description: 'Monitoreo en tiempo real y protocolos estrictos que protegen cada carga.',
  },
  {
    icon: <Recycle className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />,
    title: 'Logística Sostenible',
    description: 'Prácticas responsables que reducen el impacto ambiental.',
  },
  {
    icon: <Settings2 className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />,
    title: 'Tecnología Avanzada',
    description: 'Soluciones digitales que optimizan el control y la trazabilidad en cada etapa.',
  },
];

export default function WhyChooseUs() {
  
  // 2. Define las variantes para la animación escalonada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre cada elemento hijo
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 3. Anima el título de la sección */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            ¿Por qué <span className="text-red-600">elegirnos?</span>
          </h2>
        </motion.div>

        {/* 4. Anima el contenedor del grid para orquestar la animación de los hijos */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-x-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            // 5. Anima cada tarjeta individualmente y añade efecto hover
            <motion.div 
              key={feature.title} 
              className="text-center flex flex-col items-center cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
            >
              {/* 6. Anima el ícono al pasar el mouse sobre la tarjeta */}
              <motion.div 
                className="relative h-28 w-28 sm:h-32 sm:w-32 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 rounded-full border border-gray-200" />
                <div className="absolute inset-2 rounded-full border-4 border-white" />
                <motion.div 
                  className="relative h-full w-full rounded-full border border-gray-200 flex items-center justify-center bg-gray-50"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                   {feature.icon}
                </motion.div>
              </motion.div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-6">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}