import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, Warehouse, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"; // 1. Importa el hook

export default function BusinessLines() {
  const { t } = useTranslation(); // 2. Usa el hook

  // 3. El array ahora usa claves de traducción
  const services = [
    {
      icon: Truck,
      titleKey: "blTransportTitle",
      descriptionKey: "blTransportDesc",
      imageUrl: "/flota-camiones.jpg",
    },
    {
      icon: Warehouse,
      titleKey: "blStorageTitle",
      descriptionKey: "blStorageDesc",
      imageUrl: "/almacenajeService.jpg",
    },
    {
      icon: ShieldCheck,
      titleKey: "blCustomsTitle",
      descriptionKey: "blCustomsDesc",
      imageUrl: "/almacenajeHero.jpg",
    },
  ]

  const [activeImage, setActiveImage] = useState(services[0].imageUrl)
  const [hoveredService, setHoveredService] = useState(null)

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Encabezado Traducido */}
        <div className="mb-12 lg:mb-20 text-center lg:text-left">
          <motion.p
            className="font-bold text-red-600 uppercase tracking-wider text-sm mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('businessLinesCategory')}
          </motion.p>
          <motion.h2
            className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('businessLinesTitle')}
          </motion.h2>
        </div>

        {/* Versión Móvil Traducida */}
        <div className="lg:hidden space-y-8">
          <motion.div
            className="w-full h-72 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="/flota-camiones.jpg" alt={t('businessLinesImageAlt')} className="w-full h-full object-cover" />
          </motion.div>
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.titleKey}
                className="bg-white p-6 rounded-2xl flex items-start gap-4 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 bg-red-600 h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t(service.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(service.descriptionKey)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Versión Desktop Traducida */}
        <div
          className="hidden lg:relative lg:grid lg:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl"
          onMouseLeave={() => {
            setActiveImage(services[0].imageUrl)
            setHoveredService(null) // El estado se resetea a null
          }}
        >
          <div className="lg:col-span-1 bg-gradient-to-br from-red-600 via-red-600 to-red-700 p-12 text-white space-y-12 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            </div>
            {services.map((service, index) => (
              <motion.div
                key={service.titleKey}
                className={`relative z-10 cursor-pointer transition-all duration-300 p-4 rounded-2xl ${
                  // 4. La lógica de hover ahora usa 'titleKey'
                  hoveredService === service.titleKey ? "bg-white/10 backdrop-blur-sm" : ""
                }`}
                onMouseEnter={() => {
                  setActiveImage(service.imageUrl)
                  setHoveredService(service.titleKey) // Se guarda la clave, no el texto
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3
                  className="text-3xl font-bold mb-4"
                  animate={{ color: hoveredService === service.titleKey ? "#ffffff" : "#f3f4f6" }}
                  transition={{ duration: 0.3 }}
                >
                  {t(service.titleKey)}
                </motion.h3>
                <motion.p
                  className="text-gray-100 leading-relaxed"
                  animate={{ opacity: hoveredService === service.titleKey ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {t(service.descriptionKey)}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-2 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={t('businessLinesImageAlt')}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
          </div>

          <div className="absolute top-0 bottom-0 left-1/3 -translate-x-1/2 flex flex-col justify-around py-16 z-20">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.titleKey}
                  className={`bg-white h-20 w-20 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 border-4 ${
                    hoveredService === service.titleKey ? "border-red-500 shadow-red-500/25" : "border-white shadow-gray-900/10"
                  }`}
                  onMouseEnter={() => {
                    setActiveImage(service.imageUrl)
                    setHoveredService(service.titleKey)
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
                >
                  <div className={`transition-colors duration-300 ${ hoveredService === service.titleKey ? "text-red-600" : "text-gray-700" }`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}