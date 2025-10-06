import { useTranslation } from 'react-i18next'; // 1. Importa el hook

export default function LocationsSection() {
  const { t } = useTranslation(); // 2. Usa el hook

  // 3. El array ahora usa una clave para la dirección
  const locations = [
    {
      id: 1,
      city: "TRUJILLO",
      addressKey: "locationsAddressTrujillo", // Clave de traducción
      phone1: "+51 (044) 233498",
      phone2: "+51 (044) 233498",
    },
    {
      id: 2,
      city: "LIMA",
      addressKey: "locationsAddressLima", // Clave de traducción
      phone1: "+51 (01) 5740525",
      phone2: "+51 (01) 5740526",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-red-600 text-white py-6 px-6 sm:px-8 mb-12 rounded-lg">
          {/* 4. Traduce el título y subtítulo del banner */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t('locationsMainTitle')}</h2>
          <p className="text-base sm:text-lg opacity-90">{t('locationsMainSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {locations.map((location) => (
            <div key={location.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-full">
              <div className="bg-red-600 text-white py-2 px-4 inline-block self-start">
                <span className="font-bold text-sm tracking-wide">{location.city}</span>
              </div>

              <div className="p-6 flex-grow">
                {/* 5. Traduce la dirección */}
                <p className="text-gray-800 text-sm leading-relaxed mb-4">{t(location.addressKey)}</p>

                <div className="space-y-1">
                  <div className="text-red-600 font-semibold text-sm">{location.phone1}</div>
                  <div className="text-red-600 font-semibold text-sm">{location.phone2}</div>
                </div>
              </div>
              
              <div className="h-1.5 bg-red-600 mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}