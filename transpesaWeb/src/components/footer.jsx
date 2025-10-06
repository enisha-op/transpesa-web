import { Facebook, Instagram, Linkedin, MessageCircle, Warehouse, Truck, Globe } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  const services = [
    { name: "Almacenaje", icon: Warehouse, href: "/almacenaje" },
    { name: "Transporte", icon: Truck, href: "/transporte" },
    { name: "Aduanas", icon: Globe, href: "/#" },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gray-100 min-h-[400px] sm:min-h-[450px] md:min-h-[350px] lg:min-h-[500px] xl:min-h-[500px] overflow-hidden mt-5">
      {/* ... (resto del código del SVG y la estructura del footer sin cambios) ... */}
      
      <div className="absolute inset-0 hidden xl:block">
        <svg
          width="1440"
          height="731"
          viewBox="0 0 1440 731"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMinYMid slice"
        >
          <g clipPath="url(#clip0_566_2)">
            <rect width="1440" height="731" fill="white" />
            <path
              d="M255.174 131.3L8.8493 188.923C-1.41015 191.323 -9.65849 198.929 -12.8803 208.961L-159.827 666.508C-164.893 682.283 -156.212 699.178 -140.437 704.244L643.268 955.941C668.664 964.097 691.278 937.536 679.176 913.766L288.742 146.9C282.476 134.594 268.62 128.155 255.174 131.3Z"
              fill="#DF0000"
              stroke="#DF0000"
            />
          </g>
          <defs>
            <clipPath id="clip0_566_2">
              <rect width="1440" height="731" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0 xl:hidden bg-red-600"></div>

      <div className="relative z-10 flex flex-col xl:flex-row min-h-[400px] sm:min-h-[450px] md:min-h-[350px] lg:min-h-[500px] xl:min-h-[500px]">
        {/* Red section content */}
        <div className="w-full xl:w-[35%] text-white p-4 sm:p-6 md:p-6 lg:p-8 xl:pr-12">
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <div>
              <img
                src="/logo-transpesa-blanco.png"
                alt="GRUPO TRANSPESA"
                className="h-24 sm:h-28 md:h-24 lg:h-36 xl:h-64 w-24 sm:w-28 md:w-24 lg:w-36 xl:w-64 object-contain drop-shadow-lg"
              />
            </div>

            {/* Nav */}
            <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 md:gap-2 lg:gap-4">
              <Link
                to="/"
                className="block text-white hover:text-gray-200 hover:translate-x-1 transition-all duration-200 text-sm sm:text-base md:text-sm lg:text-base font-medium"
              >
                Inicio
              </Link>
              <Link
                to="/about"
                className="block text-white hover:text-gray-200 hover:translate-x-1 transition-all duration-200 text-sm sm:text-base md:text-sm lg:text-base font-medium"
              >
                Nosotros
              </Link>
              <Link
                to="/services"
                className="block text-white hover:text-gray-200 hover:translate-x-1 transition-all duration-200 text-sm sm:text-base md:text-sm lg:text-base font-medium"
              >
                Servicios
              </Link>
              <Link
                to="/contacto"
                className="block text-white hover:text-gray-200 hover:translate-x-1 transition-all duration-200 text-sm sm:text-base md:text-sm lg:text-base font-medium"
              >
                Contactanos
              </Link>
            </nav>
          </div>
        </div>

        {/* White section content */}
        <div className="flex-1 p-4 sm:p-6 md:p-6 lg:p-8 xl:pl-12 pt-8 sm:pt-10 md:pt-6 lg:pt-12 bg-red-600 xl:bg-transparent xl:bg-gray-100">
          {/* Título y servicios */}
          <div className="mb-8 sm:mb-10 md:mb-6 lg:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-xl lg:text-3xl font-bold text-white xl:text-gray-900 mb-6 sm:mb-8 tracking-tight">
              Nuestros Servicios
            </h3>

            {/* Timeline mejorada */}
            <div className="flex items-center w-full max-w-md">
              {services.map((service, index) => (
                <React.Fragment key={service.name}>
                  <a href={service.href} className="flex flex-col items-center text-center group px-2">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-white xl:border-gray-300 flex items-center justify-center text-white xl:text-gray-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                      <service.icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-white xl:text-gray-800 group-hover:text-white xl:group-hover:text-red-600 transition-colors">
                      {service.name}
                    </p>
                  </a>

                  {index < services.length - 1 && (
                    <div className="flex-1 h-0.5 bg-white/60 xl:bg-gray-300 group-hover:bg-red-600 transition-colors"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 md:gap-4 lg:gap-8 ml-2">
            <div className="space-y-2">
              <h5 className="font-bold text-white xl:text-red-600 mb-3 text-base sm:text-lg md:text-base lg:text-lg tracking-wide">
                Trujillo
              </h5>
              <p className="text-sm sm:text-base md:text-sm lg:text-base text-white xl:text-gray-700 leading-relaxed">
                Parcela Rustica 4808 Urb. Ex Fundo La Rea <br /> TRUJILLO - LA LIBERTAD
              </p>
              <p className="text-sm sm:text-base md:text-sm lg:text-base text-gray-100 xl:text-gray-600 font-medium">
                +51 (044) 233498 | +51 (044) 233495
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-white xl:text-red-600 mb-3 text-base sm:text-lg md:text-base lg:text-lg tracking-wide">
                Lima
              </h5>
              <p className="text-sm sm:text-base md:text-sm lg:text-base text-white xl:text-gray-700 leading-relaxed">
                Calle 2 Esquina Av. Elmer Faucett <br /> Urb. Fundo Bocanegra Alto - Callao
              </p>
              <p className="text-sm sm:text-base md:text-sm lg:text-base text-gray-100 xl:text-gray-600 font-medium">
                +51 (044) 233498 | +51 (044) 233495
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-6 lg:mt-12 pt-6 sm:pt-8 md:pt-4 lg:pt-8 border-t border-white/20 xl:border-gray-300">
            <div className="flex flex-col gap-6">
              {/* Links section */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
                <Link
                  to="/terminos-y-condiciones"
                  className="text-sm sm:text-base md:text-sm lg:text-base text-white xl:text-gray-600 hover:text-gray-200 xl:hover:text-red-600 transition-colors font-medium"
                >
                  Términos y condiciones
                </Link>
                <Link
                  to="/libro-de-reclamaciones"
                  className="text-sm sm:text-base md:text-sm lg:text-base text-white xl:text-gray-600 hover:text-gray-200 xl:hover:text-red-600 transition-colors font-medium"
                >
                  Libro de reclamaciones
                </Link>
                <Link
                  to="/trabaja-con-nosotros"
                  className="text-sm sm:text-base md:text-sm lg:text-base text-white xl:text-gray-600 hover:text-gray-200 xl:hover:text-red-600 transition-colors font-medium"
                >
                  Trabaja con nosotros
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN CORREGIDA --- */}
        <div className="flex xl:flex-col gap-3 justify-center xl:justify-start xl:absolute xl:right-4 2xl:right-6 xl:top-6 2xl:top-8 p-4 xl:p-0">
          {/* CORRECCIÓN: Se cambió <Link> por <a> para enlace externo y se añadieron target y rel */}
          <a
            href="https://www.facebook.com/GrupoTranspesaOficial?locale=es_LA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-white xl:bg-red-600 flex items-center justify-center text-red-600 xl:text-white hover:bg-gray-100 xl:hover:bg-red-700 hover:scale-110 transition-all duration-200 rounded-sm shadow-md"
          >
            <Facebook size={20} className="sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5" />
          </a>
          {/* CORRECCIÓN: Se añadieron target y rel. ¡Recuerda cambiar el href! */}
          <a
            href="https://www.instagram.com/grupo_transpesa/" // <-- REEMPLAZA CON TU URL DE INSTAGRAM
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-white xl:bg-red-600 flex items-center justify-center text-red-600 xl:text-white hover:bg-gray-100 xl:hover:bg-red-700 hover:scale-110 transition-all duration-200 rounded-sm shadow-md"
          >
            <Instagram size={20} className="sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5" />
          </a>
          <a
            href="https://wa.me/5144233498" // <-- REEMPLAZA CON TU URL DE WHATSAPP (ej. https://wa.me/51999888777)
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-white xl:bg-red-600 flex items-center justify-center text-red-600 xl:text-white hover:bg-gray-100 xl:hover:bg-red-700 hover:scale-110 transition-all duration-200 rounded-sm shadow-md"
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5" />
          </a>
          <a
            href="https://www.linkedin.com/company/grupo-transpesa/" // <-- REEMPLAZA CON TU URL DE LINKEDIN
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-white xl:bg-red-600 flex items-center justify-center text-red-600 xl:text-white hover:bg-gray-100 xl:hover:bg-red-700 hover:scale-110 transition-all duration-200 rounded-sm shadow-md"
          >
            <Linkedin size={20} className="sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}