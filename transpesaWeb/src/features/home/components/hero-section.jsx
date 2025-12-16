import { ArrowRight, Phone, ChevronDown } from "lucide-react"
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      
      {/* 1. EL VIDEO DE FONDO */}
      <div className="absolute inset-0 w-full h-full">
         <video
            autoPlay loop muted playsInline
            poster="camion1.webp"
            className="w-full h-full object-cover"
          >
            <source src="/Inicio/VideoHero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* 2. EL BLOQUE ROJIZO */}
      <div className="relative z-10 w-full md:w-[65%] min-h-screen flex flex-col justify-center">
        
        {/* Fondo rojo (Sin cambios) */}
        {/* <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-0 md:-left-48 w-full md:w-[150%] bg-gradient-to-r from-[#7f1d1d] via-[#991b1b]/95 to-transparent md:-skew-x-12 md:origin-bottom-left shadow-2xl backdrop-blur-[2px]"></div>
            <div className="hidden md:block absolute inset-y-0 right-[-10%] md:right-auto md:left-[90%] w-[1px] bg-red-500/30 md:-skew-x-12 origin-bottom-left"></div>
        </div> */}

        {/* 3. CONTENIDO (Ajuste de Tamaños) */}
        <div className="relative px-6 md:pl-24 md:pr-32 pt-32 pb-12 flex flex-col justify-center h-full">
            
            {/* Subtítulo */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-white"></div> {/* Línea más sutil */}
              <span className="text-white font-bold tracking-[0.15em] uppercase text-sm drop-shadow-md">
                {t('homeHeroSubheading')}
              </span>
            </div>

            {/* TÍTULO: AJUSTADO PARA QUE "QUEPA TODO" */}
            {/* Antes era text-[5.5rem] (muy grande). Ahora es text-6xl (60px), perfecto para escritorio. */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg tracking-tight max-w-4xl">
              {t('homeHeroTitle')}
            </h1>

            {/* DESCRIPCIÓN */}
            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed max-w-lg font-medium drop-shadow">
              {t('homeHeroDescription')}
            </p>

            {/* BOTONES */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/about" className="group flex items-center gap-2 px-8 py-3 bg-white text-[#991b1b] rounded-md hover:bg-gray-100 transition-all font-bold shadow-lg hover:-translate-y-1">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {t('homeHeroButtonKnowMore')}
              </Link>
              <Link to="/contacto" className="flex items-center gap-2 px-8 py-3 border border-white/50 text-white rounded-md hover:bg-white/10 transition-all font-bold">
                <Phone className="w-5 h-5" />
                {t('homeHeroButtonContactUs')}
              </Link>
            </div>

            {/* ESTADÍSTICAS */}
            <div className="border-t border-white/20 pt-6 w-full max-w-xl">
              <div className="flex gap-12">
                <div>
                  <div className="text-3xl md:text-4xl font-black text-white">50+</div>
                  <div className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">{t('homeHeroStatExperience')}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-white">1000+</div>
                  <div className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">{t('homeHeroStatClients')}</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-white">24/7</div>
                  <div className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">{t('homeHeroStatService')}</div>
                </div>
              </div>
            </div>

        </div>
      </div>
      
      {/* Flecha Scroll */}
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>

    </section>
  )
}