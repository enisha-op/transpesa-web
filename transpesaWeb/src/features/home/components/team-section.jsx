import { useTranslation, Trans } from 'react-i18next'; // 1. Importa

export default function TeamSection() {
  const { t } = useTranslation(); // 2. Usa el hook

  // 3. El array ahora usa claves de traducción
  const teamMembers = [
    {
      id: 1,
      nameKey: "teamMember1Name",
      positionKey: "teamMember1Position",
      image: "/images/equipo.webp",
    },
    {
      id: 2,
      nameKey: "teamMember2Name",
      positionKey: "teamMember2Position",
      image: "/images/equipo.webp",
    },
    {
      id: 3,
      nameKey: "teamMember3Name",
      positionKey: "teamMember3Position",
      image: "/images/equipo.webp",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* 4. Traduce el título y subtítulo */}
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            <Trans i18nKey="teamMainTitle">
              <span className="text-red-600" />
            </Trans>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('teamMainSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20 max-w-5xl mx-auto">
          {teamMembers.map((member) => {
            const translatedName = t(member.nameKey); // Traducimos el nombre una vez para reutilizarlo
            return (
              <div
                key={member.id}
                className="relative before:content-[''] before:absolute before:top-[-12px] before:left-[-12px] before:w-16 before:h-16 sm:before:w-24 sm:before:h-24 before:border-t-4 before:border-l-4 before:border-red-600 before:rounded-tl-3xl after:content-[''] after:absolute after:bottom-[-12px] after:right-[-12px] after:w-16 after:h-16 sm:after:w-24 sm:after:h-24 after:border-b-4 after:border-r-4 after:border-red-600 after:rounded-br-3xl"
              >
                <div className="bg-white shadow-xl rounded-2xl p-6 text-center h-full">
                  <div className="w-32 h-40 sm:w-36 sm:h-48 mx-auto mb-6 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={member.image}
                      // 5. Traduce el 'alt' text, insertando el nombre traducido
                      alt={t('teamImageAlt', { name: translatedName })}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* 6. Traduce el nombre, puesto y botón */}
                  <h3 className="text-xl font-bold text-gray-800">{translatedName}</h3>
                  <p className="text-gray-500 mb-5">{t(member.positionKey)}</p>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300"
                  >
                    {t('teamButtonLinkedIn')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}