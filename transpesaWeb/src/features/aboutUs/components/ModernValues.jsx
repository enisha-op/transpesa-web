import { Target, Goal, Gem } from 'lucide-react';
import { motion } from 'framer-motion';

const cardData = [
  {
    title: 'MISIÓN',
    imageSrc: '/Nosotros/mision.jpg',
    icon: <Target className="h-8 w-8 text-white" />,
    content: 'Brindar soluciones logísticas integrales y especializadas que conecten negocios y personas, impulsando el crecimiento de nuestros clientes y la rentabilidad de nuestros socios, con innovación, seguridad y responsabilidad social.',
  },
  {
    title: 'VISIÓN',
    imageSrc: '/Nosotros/vision.jpg',
    icon: <Goal className="h-8 w-8 text-white" />,
    content: 'Para el 2030, ser reconocidos como un operador logístico de clase mundial, líder en soluciones integrales y sostenibles, que trascienda fronteras y revolucione la experiencia logística mediante la innovación y tecnología.',
  },
  {
    title: 'VALORES',
    imageSrc: '/Nosotros/valores.jpg',
    icon: <Gem className="h-8 w-8 text-white" />,
    content: ['Innovación', 'Integridad', 'Seguridad', 'Responsabilidad', 'Excelencia', 'Trabajo en Equipo'],
  },
];

export default function MissionVisionImages() {
  
  // Variantes para la animación de entrada de las tarjetas
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cardData.map((card) => (
            // 1. Tarjeta unificada: ahora es un solo componente con sombra y animación
            <motion.div 
              key={card.title} 
              className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
            >
              {/* 2. Área de la imagen con altura flexible (aspect-ratio) */}
              <div className="relative w-full aspect-video">
                <motion.img 
                  src={card.imageSrc} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-black/50" /> 
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <motion.div 
                    className="flex items-center justify-center h-16 w-16 rounded-full bg-red-600 mb-4 shadow-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white text-center">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* 3. Área de contenido con padding mejorado y altura automática */}
              <div className="bg-white p-8 text-gray-700 leading-relaxed flex-1 flex items-center">
                {Array.isArray(card.content) ? (
                  <ul className="space-y-3 w-full">
                    {card.content.map((item) => (
                      <li key={item} className="flex items-start">
                        <svg className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center">{card.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}