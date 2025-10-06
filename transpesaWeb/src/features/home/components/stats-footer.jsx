import { useTranslation } from 'react-i18next';

export default function StatsFooter() {
  const { t } = useTranslation();

  const stats = [
    { value: '50 +', labelKey: 'statsFooterExperience' },
    { value: '300 +', labelKey: 'statsFooterCollaborators' },
    { value: '50 +', labelKey: 'statsFooterHeadquarters' },
    { value: '200 +', labelKey: 'statsFooterClients' },
    { value: '10k +', labelKey: 'statsFooterTrips' },
  ];

  return (
    <section className="bg-red-600 py-12 sm:py-16">
      <div className="container mx-auto px-6">
        {/*
          CORRECCIÓN: Cambiamos los prefijos 'md:' por 'lg:'.
          Esto mantiene el diseño de 2 columnas en tablets y solo
          muestra la fila única en pantallas grandes (1024px+).
        */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 text-center 
                       lg:flex lg:flex-row lg:justify-center lg:items-center 
                       lg:divide-x lg:divide-white/30">
          
          {stats.map((stat, index) => (
            <div 
              // La lógica para centrar el último elemento impar se mantiene para móvil/tablet
              className={`text-white px-4 flex-1 ${
                stats.length % 2 !== 0 && index === stats.length - 1 
                  ? 'col-span-2 flex justify-center' 
                  : ''
              }`}
              key={index}
            >
              {/*
                CORRECCIÓN: Se ajustó el padding interno para pantallas grandes
                y se eliminaron clases de grid que entraban en conflicto con flex.
              */}
              <div className="lg:px-6">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base opacity-90 leading-tight">
                  {t(stat.labelKey).split('\n').map((line, lineIndex) => (
                    <span key={lineIndex} className="block">{line}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}