import { useTranslation, Trans } from 'react-i18next';

export default function QualitySection() {
  const { t } = useTranslation();

  const certifications = [
    // ... tu array no cambia
    { src: "/images/sgs-certification.png", altKey: "qualityAltSGS1" },
    { src: "/images/sgs-certification.png", altKey: "qualityAltSGS2" },
    { src: "/images/sgs-certification.png", altKey: "qualityAltSGS3" },
    { src: "/images/sgs-certification.png", altKey: "qualityAltSGS4" },
  ];

  return (
    /* 👇 LÍNEA MODIFICADA AQUÍ 👇 */
    <section className="bg-gray-50 flex items-center py-24 sm:py-32 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <Trans i18nKey="qualityTitle">
            <span className="text-red-600" />
          </Trans>
        </h2>
        
        <p className="text-gray-600 text-base md:text-lg mb-10 md:mb-12">
          {t('qualitySubtitle')}
        </p>

        <div className="flex justify-center items-center gap-10 sm:gap-12 flex-wrap">
          {certifications.map((cert) => (
            <div key={cert.altKey} className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <img
                src={cert.src}
                alt={t(cert.altKey)}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}