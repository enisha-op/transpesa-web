import { Link } from 'react-scroll';

export default function SecondaryNavTransporte() {
  const linkProps = {
    spy: true,
    smooth: true,
    offset: -100, // Ajusta esto según la altura de tu nav principal
    duration: 500,
    className: "text-gray-600 hover:text-red-600 font-medium text-sm whitespace-nowrap pb-2 cursor-pointer",
    activeClass: "text-red-600 font-semibold border-b-2 border-red-600"
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40"> 
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-start md:justify-center space-x-8 py-4 overflow-x-auto">
          
          <Link to="datos-clave" {...linkProps}>
            Datos Clave
          </Link>

          <Link to="ventajas" {...linkProps}>
            Ventajas
          </Link>

          <Link to="calidad" {...linkProps}>
            Calidad
          </Link>
          
          <Link to="tipos-carga" {...linkProps}>
            Tipos de Carga
          </Link>

          <Link to="tecnologia" {...linkProps}>
            Tecnología
          </Link>

          <Link to="aliados" {...linkProps}>
            Aliados
          </Link>
        </div>
      </div>
    </nav>
  )
}