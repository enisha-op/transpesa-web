import { motion } from "framer-motion"
import { MapPin, Building2, Truck, Package } from "lucide-react"

const locations = [
  {
    id: 1,
    name: "Salaverry",
    ciudad: "Trujillo",
    tipo: "Almacén Principal",
    color: "bg-red-500",
    description: "Centro de distribución norte",
  },
  {
    id: 2,
    name: "La Encalada",
    ciudad: "Trujillo",
    tipo: "Almacén Secundario",
    color: "bg-red-600",
    description: "Soporte logístico regional",
  },
  {
    id: 3,
    name: "Lima",
    ciudad: "Callao",
    tipo: "Hub Central",
    color: "bg-red-700",
    description: "Centro de operaciones principal",
  },
]

// const stats = [
//   { icon: Building2, value: "3", label: "Almacenes" },
//   { icon: Truck, value: "24/7", label: "Operación" },
//   { icon: Package, value: "100%", label: "Cobertura" },
// ]

export default function StrategicLocationsMinimal() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header mejorado */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <MapPin className="w-4 h-4" />
            Presencia Nacional
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Ubicaciones{" "}
            <span className="text-red-600 relative">
              Estratégicas
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-red-200 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto text-pretty leading-relaxed">
            Red de almacenes estratégicamente posicionados para garantizar
            <span className="text-red-600 font-medium"> cobertura total</span> en todo el territorio peruano
          </p>
        </motion.div>

        {/* Stats mejoradas */}
        {/* <motion.div
          className="grid grid-cols-3 gap-6 mb-16 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-2">
                <stat.icon className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="relative">
                <img
                  src="/mapa-peru-rojo.png"
                  alt="Mapa de Perú"
                  className="w-full max-w-lg mx-auto h-auto filter drop-shadow-2xl"
                  loading="lazy"
                />
              </div>

              <motion.div
                className="text-center mt-8 pt-6 border-t border-gray-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <p className="text-gray-600 font-medium">🇵🇪 Cobertura estratégica en territorio nacional</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Lista de ubicaciones mejorada */}
          <motion.div
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              {/* <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xl">Nuestras Ubicaciones</h3>
                <p className="text-gray-600 text-sm">Red de distribución nacional</p>
              </div> */}
            </div>

            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-red-200 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-5">
                  <motion.div
                    className={`w-14 h-14 ${location.color} rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Building2 className="w-7 h-7" />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-gray-900 text-xl">{location.name}</h4>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>

                    <p className="text-gray-600 mb-2 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {location.ciudad}
                    </p>

                    <p className="text-gray-500 text-sm mb-3">{location.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                        {location.tipo}
                      </span>

                      <motion.div
                        className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {/* <span className="text-sm font-medium">Ver detalles →</span> */}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
