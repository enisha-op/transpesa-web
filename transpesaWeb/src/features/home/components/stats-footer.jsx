// En tu archivo StatsFooter.js

import { useTranslation } from 'react-i18next';
import AnimatedNumber from '../../../components/AnimatedNumber'; // Asegúrate que la ruta sea correcta

export default function StatsFooter() {
  const { t } = useTranslation();

  const stats = [
    { value: '50 +', labelKey: 'statsFooterExperience' },
    { value: '300 +', labelKey: 'statsFooterCollaborators' },
    { value: '50 +', labelKey: 'statsFooterHeadquarters' },
    { value: '200 +', labelKey: 'statsFooterClients' },
    // CORRECCIÓN: Para mostrar el formato de miles, usamos 10000
    { value: '10000 +', labelKey: 'statsFooterTrips' },
  ];

  return (
    <section className="bg-red-600 py-12 sm:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 text-center 
                        lg:flex lg:flex-row lg:justify-center lg:items-center 
                        lg:divide-x lg:divide-white/30">
          
          {stats.map((stat, index) => {
            // Lógica para separar el número del símbolo '+'
            const numericValue = parseInt(stat.value, 10);
            const suffix = stat.value.includes('+') ? ' +' : '';

            return (
              <div 
                className={`text-white px-4 flex-1 ${
                  stats.length % 2 !== 0 && index === stats.length - 1 
                    ? 'col-span-2 flex justify-center' 
                    : ''
                }`}
                key={index}
              >
                <div className="lg:px-6">
                  {/* 👇 AQUÍ HACEMOS EL CAMBIO */}
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    <AnimatedNumber value={numericValue} />
                    {suffix}
                  </div>
                  <div className="text-sm md:text-base opacity-90 leading-tight">
                    {t(stat.labelKey).split('\n').map((line, lineIndex) => (
                      <span key={lineIndex} className="block">{line}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}