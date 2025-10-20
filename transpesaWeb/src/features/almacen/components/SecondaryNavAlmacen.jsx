import { Link } from 'react-scroll';

export default function SecondaryNavAlmacen() {
  const linkProps = {
    spy: true,
    smooth: true,
    offset: -100,
    duration: 500,
    className: "text-gray-600 hover:text-red-600 font-medium text-sm whitespace-nowrap pb-2 cursor-pointer",
    activeClass: "text-red-600 font-semibold border-b-2 border-red-600"
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40"> 
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-start md:justify-center space-x-8 py-4 overflow-x-auto">
          
          <Link to="nosotros-almacen" {...linkProps}>
            Nosotros
          </Link>

          <Link to="caracteristicas-almacen" {...linkProps}>
            Características
          </Link>

          <Link to="calidad-almacen" {...linkProps}>
            Calidad
          </Link>
          
          <Link to="tipos-almacenes" {...linkProps}>
            Tipos de Almacenes
          </Link>

          <Link to="ubicaciones-almacen" {...linkProps}>
            Ubicaciones
          </Link>

          <Link to="equipo-almacen" {...linkProps}>
            Equipo
          </Link>

          <Link to="aliados-almacen" {...linkProps}>
            Aliados
          </Link>
        </div>
      </div>
    </nav>
  )
}