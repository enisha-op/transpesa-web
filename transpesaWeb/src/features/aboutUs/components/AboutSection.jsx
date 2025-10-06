import { Link } from "react-router-dom";


export default function AboutSection() {
  return (
    // 👇 CAMBIO: Espaciado vertical responsive
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 👇 CAMBIO: Espaciado (gap) responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-16 items-center">
          
          {/* --- COLUMNA IZQUIERDA --- */}
          {/* 👇 CAMBIO: Alineación centrada en móvil, a la izquierda en desktop */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <img 
              className="h-20 w-auto"
              src="/logo-transpesa.png"
              alt="Logo de Grupo Transpesa" 
            />
            <div className="mt-8">
              {/* 👇 CAMBIO: Texto más pequeño para mejor jerarquía visual */}
              <p className="text-lg font-bold text-gray-600 tracking-wide">IDENTIDAD</p>
              {/* 👇 CAMBIO: Título principal más granularmente responsive */}
              <h2 className="mt-2 text-4xl font-bold text-red-600 sm:text-5xl">
                QUIÉNES SOMOS
              </h2>
            </div>
          </div>

          {/* --- COLUMNA DERECHA --- */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Transpesa, nació con el propósito de conectar negocios y 
              personas a través de soluciones logísticas confiables y 
              seguras. Durante más de cuatro décadas, hemos 
              evolucionado junto a nuestros clientes, construyendo 
              relaciones sólidas y una red de operaciones que impulsa el 
              desarrollo en las principales regiones del país.
            </p>
            <p>
              Nuestro crecimiento se basa en la innovación, la excelencia y 
              la responsabilidad, valores que nos han permitido superar 
              retos y mantenernos a la vanguardia del sector. Hoy, seguimos 
              avanzando con la mirada puesta en el futuro, comprometidos 
              con generar un impacto positivo en la sociedad y en el medio 
              ambiente.
            </p>
            {/* 👇 CAMBIO: Botón centrado en móvil para fácil acceso */}
            <div className="pt-6 flex justify-center md:justify-start">
              <a 
                href="#timeline" 
                className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-colors shadow-lg"
              >
                Conoce Nuestra Trayectoria
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}