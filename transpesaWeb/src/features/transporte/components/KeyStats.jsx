// Array de datos para las estadísticas. Así es fácil añadir o modificar cifras.
const stats = [
  { value: '+150', label: 'UNIDADES MODERNAS' },
  { value: '+95%', label: 'ENTREGAS A TIEMPO' },
  { value: '+8,500', label: 'TONELADAS TRANSPORTADAS' },
  { value: '+20', label: 'RUTAS ESTRATÉGICAS' },
];

export default function KeyStats() {
  return (
    // 👇 CAMBIO: Espaciado vertical responsive
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 👇 CAMBIO: Espaciado (gap) responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-16 items-center">
          
          {/* --- COLUMNA IZQUIERDA (TEXTO) --- */}
          <div className="space-y-8 text-center lg:text-left">
            {/* 👇 CAMBIO: Ancho del logo responsive y centrado en móvil */}
            <img 
              src="/logo-transpesa.png"
              alt="Logo Grupo Transpesa"
              className="w-36 sm:w-48 mx-auto lg:mx-0"
              loading="lazy"
            />
            <p className="text-gray-600 leading-relaxed">
              Impulsamos el crecimiento logístico con una flota moderna, procesos eficientes y un compromiso constante con la excelencia.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nuestro objetivo es garantizar entregas puntuales, seguras y confiables, conectando estratégicamente diferentes puntos del país para ofrecer soluciones a la medida de nuestros clientes.
            </p>
          </div>

          {/* --- COLUMNA DERECHA (ESTADÍSTICAS) --- */}
          <div className="space-y-8">
            {/* 👇 CAMBIO: Padding y tipografía responsivos en la tarjeta principal */}
            <div className="bg-red-600 text-white p-6 sm:p-8 rounded-2xl shadow-lg text-center">
              <span className="text-6xl sm:text-7xl font-bold">+50</span>
              <p className="text-xl sm:text-2xl mt-2">años de experiencia</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  {/* 👇 CAMBIO: Tipografía de las estadísticas secundarias responsive */}
                  <span className="text-3xl sm:text-4xl font-bold text-red-600">{stat.value}</span>
                  <p className="mt-1 text-sm font-semibold text-gray-800 tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}