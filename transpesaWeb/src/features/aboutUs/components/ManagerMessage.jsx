import { motion } from 'framer-motion';

export default function ManagerMessage() {

  // Variantes para animar el texto de forma escalonada
  const textContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden"> {/* Añadido overflow-hidden */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- COLUMNA IZQUIERDA (IMAGEN) --- */}
          {/* 1. Contenedor principal de la imagen que se activa al ser visible */}
          <motion.div 
            className="relative w-full max-w-md mx-auto aspect-square flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 2. El Arco decorativo animado */}
            <motion.div 
              className="absolute w-full h-full rounded-full border-[20px] sm:border-[24px] border-red-600"
              initial={{ rotate: -90, scale: 0.8 }}
              whileInView={{ rotate: -45, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
            />
            
            {/* 3. La imagen del gerente animada */}
            <motion.img 
              src="/fotoGerente.jpg"
              alt="Enrique Pesantes Novoa, Gerente General"
              className="relative object-cover w-[80%] h-[80%] rounded-full shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            />

            {/* 4. El sello de "+40 Años" animado */}
            <motion.div 
              className="absolute bottom-0 right-0 h-28 w-28 sm:h-36 sm:w-36 bg-white rounded-full border-[6px] border-red-600 flex flex-col items-center justify-center text-center p-2 shadow-xl"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            >
              <span className="text-3xl sm:text-4xl font-bold text-red-600">+40</span>
              <span className="text-xs sm:text-sm font-semibold leading-tight text-gray-800">AÑOS CONSTRUYENDO CONFIANZA</span>
            </motion.div>
          </motion.div>

          {/* --- COLUMNA DERECHA (TEXTO) --- */}
          {/* 5. Contenedor del texto que orquesta la animación escalonada */}
          <motion.div 
            className="row-start-1 lg:row-start-auto"
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={textItemVariants} className="text-red-600 font-bold uppercase tracking-wider">
              Liderazgo
            </motion.p>
            <motion.h2 variants={textItemVariants} className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Palabras del Gerente General
            </motion.h2>
            <motion.p variants={textItemVariants} className="mt-6 text-gray-600 leading-relaxed">
              Transpesa, con una sólida trayectoria en el sector logístico, se ha convertido en un referente en soluciones integrales de transporte, almacenaje y gestión aduanera. A lo largo de los años, hemos construido relaciones basadas en confianza, seguridad y eficiencia, conectando a nuestros clientes con servicios de alto valor y tecnología de vanguardia.
              <br/><br/>
              Nuestro compromiso es seguir creciendo de manera sostenible, impulsando la innovación y el desarrollo de nuestro equipo humano, con el objetivo de trascender fronteras y consolidarnos como una empresa de clase mundial.
            </motion.p>
            <motion.div variants={textItemVariants} className="mt-8">
              <p className="text-xl font-bold text-red-600">Enrique Pesantes Novoa</p>
              <p className="text-gray-500">Gerente General</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}