// --- Datos de la línea de tiempo (sin cambios) ---
const timelineData = [
  {
    year: '1971',
    title: 'El Origen',
    description: 'Inicio de operaciones con la conducción de un solo camión, liderada por el señor enrique pesantes cueva, bajo la razón social Transportes Pesantes Novoa Hermanos, marcando el nacimiento de una empresa basada en el esfuerzo, la responsabilidad y el trabajo constante.',
    image: '/Nosotros/1955.webp',
  },
  {
    year: '1998',
    title: 'Visión de Crecimiento',
    description: 'Importación de 20 camiones desde Suecia, consolidando un salto importante en la modernización de la flota y reafirmando una visión empresarial orientada al crecimiento sostenido.',
    image: '/Nosotros/A2.webp',
  },
  {
    year: '2000',
    title: 'Nacimiento de Transpesa',
    description: 'Cambio de razón social y consolidación de la empresa bajo el nombre transpesa, dando inicio a una nueva etapa de profesionalización, expansión y fortalecimiento institucional.',
    image: '/Nosotros/A6.webp',
  },
  {
    year: '2008',
    title: 'Diversificación Logística',
    description: 'Inicio del negocio de almacenes Altra, ampliando la oferta de servicios hacia soluciones integrales de almacenaje y logística especializada.',
    image: '/Nosotros/Imagen1.webp',
  },
  {
    year: '2015',
    title: 'Expansión Nacional',
    description: 'Consolidación de operaciones a nivel nacional, con presencia estratégica en Lima, Trujillo y Piura, fortaleciendo la cobertura operativa y la capacidad de atención a clientes de distintos sectores.',
    image: '/Nosotros/2010.webp',
  },
  {
    year: '2017',
    title: 'Tecnología y Control',
    description: 'Implementación integral de gps, telemetría y torre de control 24/7, elevando los estándares de seguridad, trazabilidad, control operativo y toma de decisiones en tiempo real.',
    image: '/Nosotros/1990.webp',
  },
  {
    year: '2025',
    title: 'Modernización de Flota',
    description: 'Incorporación de más de 100 unidades nuevas, incluyendo flota de última generación a gnl – euro 6, reafirmando el compromiso del grupo con la eficiencia operativa, la sostenibilidad y la innovación tecnológica.',
    image: '/Nosotros/1980.webp',
  },
];

// --- Componentes para la vista de ESCRITORIO (sin cambios) ---
const EventCard = ({ children, align }) => (
  <div className={`w-full flex ${align === 'right' ? 'justify-start' : 'justify-end'}`}>
    <div className="w-full lg:w-11/12">{children}</div>
  </div>
);
const YearMarker = ({ year }) => (
  <div className="flex-shrink-0 bg-red-600 w-full flex items-center justify-center h-48">
    <span className="text-white text-6xl font-bold font-inria">{year}</span>
  </div>
);
const TextBlock = ({ event, align }) => (
  <div className={`relative p-6 ${align === 'right' ? 'lg:text-right' : 'lg:text-left'}`}>
    <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-0.5 w-8 bg-gray-300 ${align === 'right' ? '-right-8' : '-left-8'}`} />
    <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
    <p className="mt-2 text-gray-600">{event.description}</p>
  </div>
);
const ImageBlock = ({ event }) => (
  <div className="relative p-4 border-2 border-gray-100 rounded-lg">
    <img src={event.image} alt={event.title} className="rounded-md w-full" loading="lazy" />
    <div className="absolute -top-2 -right-2 h-1/4 w-2 bg-red-600" />
    <div className="absolute -top-2 -right-2 w-1/4 h-2 bg-red-600" />
  </div>
);

// --- NUEVO Componente para la vista MÓVIL ---
const MobileEventCard = ({ event }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
    <div className="bg-red-600 py-3 px-5">
      <h2 className="text-white text-3xl font-bold font-inria">{event.year}</h2>
    </div>
    <div className="p-5">
      <img src={event.image} alt={event.title} className="rounded-md w-full mb-4" loading="lazy" />
      <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
      <p className="mt-2 text-gray-600">{event.description}</p>
    </div>
  </div>
);

export default function HistoryTimeline() {
  return (
    // 👇 CAMBIO: Espaciado vertical responsive
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <p className="font-bold text-red-600 uppercase">Nuestra Historia</p>
          {/* 👇 CAMBIO: Título responsive */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">HISTORIA</h2>
        </div>

        {/* --- VERSIÓN MÓVIL (Simple y Vertical) --- */}
        {/* Se muestra solo en pantallas pequeñas (hasta 'lg') */}
        <div className="lg:hidden space-y-12">
          {timelineData.map((event) => (
            <MobileEventCard key={event.year} event={event} />
          ))}
        </div>

        {/* --- VERSIÓN ESCRITORIO (Alternante y con Barra Central) --- */}
        {/* Se muestra solo en pantallas 'lg' y superiores */}
        <div className="hidden lg:block relative">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-40 bg-red-600" />
          <div className="space-y-0">
            {timelineData.map((event, index) => (
              <div key={event.year} className="grid grid-cols-[1fr_auto_1fr] gap-8 items-center">
                {index % 2 === 0 ? (
                  <>
                    <EventCard align="right"><TextBlock event={event} align="right" /></EventCard>
                    <div className="relative z-10"><YearMarker year={event.year} /></div>
                    <EventCard align="left"><ImageBlock event={event} /></EventCard>
                  </>
                ) : (
                  <>
                    <EventCard align="right"><ImageBlock event={event} /></EventCard>
                    <div className="relative z-10"><YearMarker year={event.year} /></div>
                    <EventCard align="left"><TextBlock event={event} align="left" /></EventCard>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}