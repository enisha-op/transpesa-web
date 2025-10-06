import { useTranslation } from 'react-i18next';

export default function VisionSection() {
  const { t } = useTranslation();

  return (
    // CORRECCIÓN: Se quitó 'min-h-screen' y se añadió un padding vertical (py-24 y lg:py-32)
    <section className="relative bg-white overflow-hidden py-24 lg:py-32">
      {/* --- VERSIÓN MÓVIL --- */}
      <div className="lg:hidden">
        <div className="bg-white px-4 pt-20 pb-12">
          <div className="relative w-full max-w-sm mx-auto h-[400px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
              <img src="/imageHero.jpg" alt={t('visionAltAirplane')} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-8 left-0 w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-xl z-0">
              <img src="/camion2.jpg" alt={t('visionAltTruck')} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-8 right-0 w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-xl z-0">
              <img src="/almacenajeHero.jpg" alt={t('visionAltWorker')} className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-20">
              <img src="/logo-transpesa-blanco.png" alt={t('visionAltLogo')} className="w-3/5 h-3/5 object-contain" />
            </div>
          </div>
        </div>
        <div className="bg-red-600 px-6 py-16 text-white">
          <blockquote className="text-2xl font-normal leading-tight mb-6 text-balance">
            {t('visionQuote')}
          </blockquote>
          <cite className="text-lg font-light opacity-90">{t('visionCite')}</cite>
        </div>
      </div>

      {/* --- VERSIÓN ESCRITORIO --- */}
      <div className="hidden lg:block">
        <div
          className="absolute bg-red-600 rounded-full"
          style={{
            width: '100vw',
            height: '100vw',
            top: '50%',
            right: '-40vw',
            transform: 'translateY(-50%)',
          }}
        ></div>

        {/* CORRECCIÓN: Se quitó 'min-h-screen' del contenedor principal */}
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 items-center px-6">
          
          <div className="relative w-full h-[650px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] xl:w-[380px] xl:h-[380px] rounded-full overflow-hidden border-[6px] border-white shadow-2xl z-10">
              <img src="/imageHero.jpg" alt={t('visionAltAirplane')} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-24 left-4 xl:left-12 w-[240px] h-[240px] xl:w-[280px] xl:h-[280px] rounded-full overflow-hidden border-[6px] border-white shadow-xl z-0">
              <img src="/camion2.jpg" alt={t('visionAltTruck')} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-24 right-4 xl:right-12 w-[240px] h-[240px] xl:w-[280px] xl:h-[280px] rounded-full overflow-hidden border-[6px] border-white shadow-xl z-0">
              <img src="/almacenajeHero.jpg" alt={t('visionAltWorker')} className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[180px] h-[180px] xl:w-[220px] xl:h-[220px] bg-red-600 rounded-full flex items-center justify-center border-[6px] border-white shadow-xl z-20">
              <img src="/logo-transpesa-blanco.png" alt={t('visionAltLogo')} className="w-3/5 h-3/5 object-contain" />
            </div>
          </div>

          <div className="relative z-20 text-white pl-8 lg:pl-0 xl:pl-16">
            <blockquote className="text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight mb-12 max-w-lg text-balance">
              {t('visionQuote')}
            </blockquote>
            <cite className="text-xl lg:text-2xl font-light opacity-90">{t('visionCite')}</cite>
          </div>
        </div>
      </div>
    </section>
  )
}