import { Zap, ShieldCheck, Recycle, Settings2 } from 'lucide-react';

// 👇 CAMBIO: Los íconos ahora tienen clases responsivas
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
  return (
    // 👇 CAMBIO: Espaciado vertical responsive
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título de la Sección */}
        {/* 👇 CAMBIO: Margen inferior responsive */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            ¿Por qué <span className="text-red-600">elegirnos?</span>
          </h2>
        </div>

        {/* Contenedor del Grid */}
        {/* 👇 CAMBIO: Espaciado (gap) responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-x-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center flex flex-col items-center">
              
              {/* 👇 CAMBIO: Contenedor del ícono responsive */}
              <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-gray-200" />
                <div className="absolute inset-2 rounded-full border-4 border-white" />
                <div className="relative h-full w-full rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                   {feature.icon}
                </div>
              </div>

              {/* Contenido de Texto */}
              {/* 👇 CAMBIO: Título del feature responsive */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-6">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}