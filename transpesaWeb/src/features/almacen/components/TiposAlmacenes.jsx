import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function TiposAlmacenesSection() {
  const services = [
    {
      id: 1,
      title: "Almacen de Granos",
      description:
        "Unidades exclusivas para operaciones personalizadas, diseñadas para responder a las necesidades específicas de cada cliente.",
      link: "#",
      imageUrl: "Almacen/almacen02.png",
    },
    {
      id: 2,
      title: "Almacen Logístico",
      description:
        "Transporte seguro y especializado de concentrados de mineral, cumpliendo con las más estrictas normativas del sector.",
      link: "#",
      imageUrl: "Almacen/Almacen.webp",
    },
    {
      id: 3,
      title: "Almacen Aduanero",
      description:
        "Distribución segura y eficiente de combustibles líquidos con los más altos estándares de calidad y seguridad.",
      link: "#",
      imageUrl: "Almacen/tiposAlmacen/almacenajeHero.webp",
    },
  ]
  
  const [activeBg, setActiveBg] = useState(services[0].imageUrl)

  return (
    <section className="relative min-h-screen lg:h-screen w-full overflow-hidden">
      
      {/* --- VERSIÓN MÓVIL (Secciones a pantalla completa) --- */}
      {/* 👇 CAMBIO: Contenedor móvil ahora sin padding para un look 'full-bleed' */}
      <div className="lg:hidden">
        {/* 👇 CAMBIO: Eliminamos el espacio entre tarjetas */}
        <div className="space-y-0">
            {services.map(service => (
                // 👇 CAMBIO: Cada tarjeta ya no tiene bordes redondeados y es más alta (80% de la altura de la pantalla)
                <div key={service.id} className="relative w-full h-[40vh] shadow-xl">
                    <img src={service.imageUrl} alt={service.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                        <h3 className="text-3xl font-bold">{service.title}</h3>
                        <p className="mt-2 text-base leading-relaxed">{service.description}</p>
                        {/* <div className="mt-6">
                            <a href={service.link} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-base font-semibold transition-colors">
                                Ver más
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* --- VERSIÓN ESCRITORIO (Interactiva y Horizontal) --- */}
      {/* Esta parte no ha cambiado */}
      <div className="hidden lg:flex relative h-full">
        <AnimatePresence>
          <motion.div
            key={activeBg}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${activeBg}')` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="relative h-full flex w-full"
          onMouseLeave={() => setActiveBg(services[0].imageUrl)}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group flex-1 relative cursor-pointer transition-all duration-300 hover:flex-[1.5]"
              onMouseEnter={() => setActiveBg(service.imageUrl)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 group-hover:backdrop-blur-sm" />

              {index < services.length - 1 && (
                <div className="absolute right-0 top-0 h-full w-px bg-white/20" />
              )}

              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <div className="mb-6">
                  <h3 className="text-4xl font-bold mb-2 transform transition-all duration-300 group-hover:translate-y-0">
                    {service.title}
                  </h3>
                </div>
                <div className="opacity-0 max-w-md transform translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-lg leading-relaxed mb-6">{service.description}</p>
                  {/* <div className="flex items-center">
                    <div className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                      <span className="font-medium">Ver más</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 rotate-90 origin-center">
                <span className="text-white/60 text-sm font-medium tracking-[0.3em] uppercase">
                  Servicio
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}