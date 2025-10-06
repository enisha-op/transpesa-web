import { useTranslation } from 'react-i18next'; // 1. Importa el hook
import { Settings, Shield, Lightbulb, Users, Globe } from "lucide-react"

export default function PillarsSection() {
  const { t } = useTranslation(); // 2. Usa el hook

  // 3. El array ahora usa claves de traducción
  const pillars = [
    {
      icon: <Settings className="w-10 h-10 text-white mb-3" />,
      titleKey: 'pillarsLogisticsTitle',
      descriptionKey: 'pillarsLogisticsDesc',
    },
    {
      icon: <Shield className="w-10 h-10 text-white mb-3" />,
      titleKey: 'pillarsSafetyTitle',
      descriptionKey: 'pillarsSafetyDesc',
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-white mb-3" />,
      titleKey: 'pillarsTechTitle',
      descriptionKey: 'pillarsTechDesc',
    },
    {
      icon: <Users className="w-10 h-10 text-white mb-3" />,
      titleKey: 'pillarsIntegrityTitle',
      descriptionKey: 'pillarsIntegrityDesc',
    },
    {
      icon: <Globe className="w-10 h-10 text-white mb-3" />,
      titleKey: 'pillarsSustainableTitle',
      descriptionKey: 'pillarsSustainableDesc',
    },
  ];

  return (
    <section className="bg-red-600 py-16 sm:py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

          {/* ELEMENTO 1: Título y descripción */}
          <div className="mb-8 sm:mb-0">
            {/* 4. Traduce el título y subtítulo */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('pillarsMainTitle')}
            </h2>
            <p className="text-white/90 text-base leading-relaxed">
              {t('pillarsMainSubtitle')}
            </p>
          </div>

          {/* ELEMENTOS RESTANTES: Las 5 tarjetas de pilares */}
          {pillars.map((pillar) => (
            <div key={pillar.titleKey} className="border-2 border-white/80 p-6 rounded-lg h-full">
              {pillar.icon}
              {/* 5. Traduce el título y la descripción de cada tarjeta */}
              <h3 className="text-xl font-bold text-white mb-2">{t(pillar.titleKey)}</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {t(pillar.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}