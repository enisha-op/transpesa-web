import { Target, Goal, Gem } from 'lucide-react';

const cardData = [
  {
    title: 'MISIÓN',
    imageSrc: '/camion1.jpg', // <-- CAMBIA ESTO
    icon: <Target className="h-8 w-8 text-white" />,
    content: 'Brindar soluciones logísticas integrales y especializadas que conecten negocios y personas, impulsando el crecimiento de nuestros clientes y la rentabilidad de nuestros socios, con innovación, seguridad y responsabilidad social, generando impacto positivo en la comunidad y en armonía con el medio ambiente.',
  },
  {
    title: 'VISIÓN',
    imageSrc: '/camion2.jpg', // <-- CAMBIA ESTO
    icon: <Goal className="h-8 w-8 text-white" />,
    content: 'Para el 2030, ser reconocidos como un operador logístico de clase mundial, líder en soluciones integrales y sostenibles, que trascienda fronteras y revolucione la experiencia logística mediante la innovación, la tecnología y un equipo humano altamente comprometido.',
  },
  {
    title: 'VALORES',
    imageSrc: '/imageHero.jpg', // <-- CAMBIA ESTO
    icon: <Gem className="h-8 w-8 text-white" />,
    content: ['Innovación', 'Integridad', 'Seguridad', 'Responsabilidad', 'Excelencia', 'Trabajo en Equipo'],
  },
];

export default function MissionVisionImages() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Contenedor del Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {cardData.map((card) => (
            <div key={card.title} className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              
              {/* 1. Área de la Imagen y Título/Ícono (parte superior de la tarjeta) */}
              <div className="relative h-64"> {/* Altura fija para la imagen */}
                <img 
                  src={card.imageSrc} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay oscuro para la legibilidad del texto */}
                <div className="absolute inset-0 bg-black/50" /> 

                {/* Contenido (Ícono y Título) centrado vertical y horizontalmente */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-600 mb-4 shadow-md">
                    {card.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white text-center">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* 2. Área del Contenido Descriptivo (parte inferior de la tarjeta) */}
              <div className="bg-white p-6 text-gray-700 leading-relaxed min-h-[180px] flex items-center">
                {Array.isArray(card.content) ? (
                  <ul className="space-y-2 w-full">
                    {card.content.map((item) => (
                      <li key={item} className="flex items-start"> {/* items-start para alinear bien el check */}
                        <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center">{card.content}</p> // Texto centrado para párrafos cortos
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}