import { Link } from 'react-scroll';

export default function SecondaryNav() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40"> 
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-start md:justify-center space-x-8 py-4 overflow-x-auto">
          
          <Link
            to="descripcion"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="text-gray-600 hover:text-red-600 font-medium text-sm whitespace-nowrap pb-2 cursor-pointer"
            activeClass="text-red-600 font-semibold border-b-2 border-red-600"
          >
            Descripción
          </Link>

          <Link to="servicios" spy={true} smooth={true} offset={-100} duration={500} className="text-gray-600 hover:text-red-600 font-medium text-sm whitespace-nowrap pb-2 cursor-pointer" activeClass="text-red-600 font-semibold border-b-2 border-red-600">
            Servicios
          </Link>

          <Link to="pilares" spy={true} smooth={true} offset={-100} duration={500} className="text-gray-600 hover:text-red-600 font-medium text-sm whitespace-nowrap pb-2 cursor-pointer" activeClass="text-red-600 font-semibold border-b-2 border-red-600">
            Pilares
          </Link>
          
          <Link to="certificaciones" spy={true} smooth={true} offset={-100} duration={500} className="text-gray-600 hover:text-red-600 font-medium text-sm whitespace-nowrap pb-2 cursor-pointer" activeClass="text-red-600 font-semibold border-b-2 border-red-600">
            Certificaciones
          </Link>

          <Link to="equipo" spy={true} smooth={true} offset={-100} duration={500} className="text-gray-600 hover:text-red-600 font-medium text-sm whitespace-nowrap pb-2 cursor-pointer" activeClass="text-red-600 font-semibold border-b-2 border-red-600">
            Equipo
          </Link>

          <Link to="aliados" spy={true} smooth={true} offset={-100} duration={500} className="text-gray-600 hover:text-red-600 font-medium text-sm whitespace-nowrap pb-2 cursor-pointer" activeClass="text-red-600 font-semibold border-b-2 border-red-600">
            Aliados
          </Link>
        </div>
      </div>
    </nav>
  )
}