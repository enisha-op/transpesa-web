import HexagonIcon from '@/components/HexagonIcon';
import { Target, Goal, Gem } from 'lucide-react';

const cardData = [
  {
    title: 'MISIÓN',
    imageSrc: '/camion1.jpg',
    icon: <Target size={36} />,
    content: 'Brindar soluciones logísticas integrales y especializadas que conecten negocios y personas, impulsando el crecimiento de nuestros clientes y la rentabilidad de nuestros socios, con innovación, seguridad y responsabilidad social, generando impacto positivo en la comunidad y en armonía con el medio ambiente.',
  },
  {
    title: 'VISIÓN',
    imageSrc: '/camion2.jpg',
    icon: <Goal size={36} />,
    content: 'Para el 2030, ser reconocidos como un operador logístico de clase mundial, líder en soluciones integrales y sostenibles, que trascienda fronteras y revolucione la experiencia logística mediante la innovación, la tecnología y un equipo humano altamente comprometido.',
  },
  {
    title: 'VALORES',
    imageSrc: '/imageHero.jpg',
    icon: <Gem size={36} />,
    content: ['Innovación', 'Integridad', 'Seguridad', 'Responsabilidad', 'Excelencia', 'Trabajo en Equipo'],
  },
];

export default function MissionVisionValues() {
  return (
    // 👇 CAMBIO: Espaciado vertical responsive
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 👇 CAMBIO: Gap vertical responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 md:gap-y-24">
          
          {cardData.map((card) => (
            <div key={card.title} className="relative text-center">
              
              <div className="relative">
                {/* 👇 CAMBIO: Altura de imagen responsive */}
                <img 
                  src={card.imageSrc} 
                  alt={card.title} 
                  className="rounded-lg shadow-lg w-full h-40 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                {/* 👇 CAMBIO: Título responsive */}
                <h3 className="absolute bottom-4 left-4 text-white text-2xl sm:text-3xl font-bold">
                  {card.title}
                </h3>
              </div>
              
              {/* 👇 CAMBIO: Posición del hexágono sincronizada con la altura de la imagen */}
              <div className="absolute top-40 sm:top-48 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <HexagonIcon>{card.icon}</HexagonIcon>
              </div>
              
              {/* 👇 CAMBIO: Padding superior del texto también sincronizado */}
              <div className="bg-gray-50 rounded-b-lg px-4 pt-16 sm:pt-20 pb-8">
                <div className="text-gray-600">
                  {Array.isArray(card.content) ? (
                    // 👇 CAMBIO: Se quitan los estilos de lista para un look más limpio
                    <ul className="space-y-1 list-none">
                      {card.content.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : (
                    <p>{card.content}</p>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}