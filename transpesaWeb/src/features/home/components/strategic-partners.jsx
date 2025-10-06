import { useTranslation, Trans } from 'react-i18next';

export default function StrategicPartners() {
  const { t } = useTranslation();

  const partners = [
    { src: "/images/volcan.png", altKey: "partnersAltVolcan" },
    { src: "/images/limaGas.png", altKey: "partnersAltLimagas" },
    { src: "/images/arca.png", altKey: "partnersAltArcacon" },
    { src: "/images/solgas.png", altKey: "partnersAltSolgas" },
  ];

  // Duplicamos los partners para el efecto de bucle infinito
  const extendedPartners = [...partners, ...partners];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          <Trans i18nKey="partnersMainTitle">
            <span className="text-red-600" />
            <span className="text-black" />
          </Trans>
        </h2>

        {/* Contenedor del carrusel con overflow hidden y group para el hover */}
        <div
          className="group relative w-full overflow-hidden"
          // Aplicamos una máscara de degradado para suavizar los bordes
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          }}
        >
          {/* Contenedor que se anima */}
          <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
            {extendedPartners.map((partner, index) => (
              <div key={`${partner.altKey}-${index}`} className="flex-shrink-0 mx-8 sm:mx-12 flex items-center justify-center h-24 sm:h-32">
                <img
                  src={partner.src}
                  alt={t(partner.altKey)}
                  className="max-h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}