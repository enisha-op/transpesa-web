import { useTranslation } from 'react-i18next'; // 1. Importa el hook

// Fíjate que ahora recibe 'titleKey' en lugar de 'title'
export default function Hero({ titleKey, imageUrl, altText }) { 
  const { t } = useTranslation(); // 2. Usa el hook para obtener la función de traducción 't'

  return (
    <section className="relative h-[560px] lg:h-screen flex items-center justify-center">
      <img 
        src={imageUrl}
        alt={altText}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div 
        className="absolute inset-0 bg-black/40 z-10" 
        aria-hidden="true"
      />
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="font-inria italic font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          {t(titleKey)} {/* 3. Usa t() para mostrar el texto traducido según la clave */}
        </h1>
      </div>
    </section>
  );
}