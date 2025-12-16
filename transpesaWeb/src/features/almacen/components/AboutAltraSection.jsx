// --- Datos para las estadísticas ---
const stats = [
  { number: "5", text: "Sedes" },
  { number: "2000", text: "Metros cuadrados" },
  { number: "3", text: "Tipos de almacenes" },
]

// --- Componente de Estadística ahora con tipografía responsive ---
const StatItem = ({ number, text }) => (
  <div>
    {/* 👇 CAMBIO: Tamaño de fuente responsive para los números */}
    <p className="text-3xl sm:text-4xl font-bold text-red-600">{number}</p>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
)

export default function AboutAltraSection() {
  return (
    // 👇 CAMBIO: Espaciado vertical responsive y max-width para mejor contención de contenido
    <section className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-y-20 lg:grid-cols-2 lg:gap-x-20 xl:gap-x-24">
          {/* --- Columna Izquierda: Información --- */}
          {/* 👇 CAMBIO: Más padding interno y espaciado */}
          <div className="flex flex-col px-4 lg:px-8">
            <img src="/logo-transpesa.png" alt="Altra Almacenes Logo" className="h-14 w-auto self-start mb-2" loading="lazy" />

            {/* 👇 CAMBIO: Mejor espaciado de texto y legibilidad */}
            <p className="mt-8 text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl max-w-lg">
              Altra Almacenaje combina experiencia y tecnología para optimizar la gestión logística de tu empresa. Con
              infraestructura moderna y sistemas digitales de control, garantizamos trazabilidad, seguridad y eficiencia
              en cada operación.
            </p>

            {/* 👇 CAMBIO: Mayor espacio y mejora en el diseño */}
            <div className="mt-12 flex flex-col items-center gap-12 sm:flex-row sm:gap-16 lg:gap-12 xl:gap-16">
              <div className="relative flex-shrink-0">
                {/* 👇 CAMBIO: Círculo más grande con mejores proporciones */}
                <div className="flex h-40 w-40 sm:h-48 sm:w-48 flex-col items-center justify-center rounded-full border-[12px] border-red-600 bg-white shadow-lg">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-red-600">10</span>
                  <span className="text-center text-sm sm:text-base leading-tight text-gray-500 mt-1">
                    años <br /> de almacenaje
                  </span>
                </div>
                <div className="absolute top-10 -right-2 h-4 w-4 rounded-full bg-red-600"></div>
                <div className="absolute top-20 -right-6 h-3 w-3 rounded-full bg-red-600"></div>
              </div>

              {/* 👇 CAMBIO: Mayor espacio para las estadísticas */}
              <div className="flex flex-col gap-6 text-center sm:text-left">
                {stats.map((stat) => (
                  <StatItem key={stat.text} number={stat.number} text={stat.text} />
                ))}
              </div>
            </div>
          </div>

          {/* --- Columna Derecha: Imagen --- */}
          {/* 👇 CAMBIO: Padding agregado y mejora en el contenedor de la imagen */}
          <div className="relative h-80 sm:h-96 lg:h-[500px] px-4 lg:px-8">
            {/* 👇 CAMBIO: Posicionamiento ajustado del elemento de fondo */}
            <div className="absolute top-4 right-4 lg:right-8 h-4/5 w-4/5 bg-red-600 rounded-l-lg"></div>
            <div className="absolute bottom-4 left-4 lg:left-8 h-full w-5/6 overflow-hidden rounded-lg shadow-2xl z-10">
              <img src="/Almacen/almacen03.webp" alt="Camión de Altra" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
