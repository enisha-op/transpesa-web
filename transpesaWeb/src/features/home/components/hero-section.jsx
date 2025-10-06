import { ArrowRight, Phone, ChevronDown } from "lucide-react"
import { useTranslation } from 'react-i18next'; // 1. Importa el hook
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { t } = useTranslation(); // 2. Usa el hook para obtener la función 't'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="camion1.jpg"
          alt={t('homeHeroAltText')} // 3. Usa t() para traducir
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent md:bg-gradient-to-l md:from-black/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12 md:pt-20">
        <div className="flex justify-center md:justify-end">
          <div className="max-w-2xl text-center md:text-left">
            <div className="hidden md:flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-red-500"></div>
              <span className="text-red-300 font-semibold tracking-wider uppercase text-sm">
                {t('homeHeroSubheading')}
              </span>
            </div>
            <h1 className="text-4xl sm:text-4xl lg:text-4xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
              {t('homeHeroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              {t('homeHeroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center md:justify-start">
              <Link to="/about" className="flex items-center justify-center gap-3 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                <ArrowRight className="w-5 h-5" />
                {t('homeHeroButtonKnowMore')}
              </Link>
              <Link to="/contacto" className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold">
                <Phone className="w-5 h-5" />
                {t('homeHeroButtonContactUs')}
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 bg-black/30 backdrop-blur-sm rounded-xl p-4 sm:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">50+</div>
                <div className="text-gray-300 text-xs sm:text-sm">{t('homeHeroStatExperience')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">1000+</div>
                <div className="text-gray-300 text-xs sm:text-sm">{t('homeHeroStatClients')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">24/7</div>
                <div className="text-gray-300 text-xs sm:text-sm">{t('homeHeroStatService')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  )
}