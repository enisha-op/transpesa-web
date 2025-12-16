import { useTranslation, Trans } from 'react-i18next';

// Este componente no necesita cambios
const StatItem = ({ number, text }) => (
  <div>
    <p className="text-4xl font-bold text-red-600">{number}</p>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);

export default function ContentSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Contenedor en flex para centrar mejor */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
          
          {/* Texto */}
          <div className="max-w-lg text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <Trans i18nKey="homeContentTitle">
                <span className="text-red-600" />
                <br />
                <span className="text-red-600" />
              </Trans>
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              <Trans
                i18nKey="homeContentSubtitle"
                components={[<br />, <br />]}
              />
            </p>
          </div>

          {/* Imagen */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-full aspect-square flex items-center justify-center overflow-hidden w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <img
                src="/Inicio/Inicio05.webp"
                alt={t('homeContentImageAlt')}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
