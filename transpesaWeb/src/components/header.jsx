import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"

export default function Navigation() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const serviceLinks = [
    { href: "/transporte", key: "navServiceTransport" },
    { href: "/almacenaje", key: "navServiceStorage" },
    { 
      href: "https://amt.pe/", 
      key: "navServiceCustoms", 
      external: true 
    },
  ]

  return (
    <>
      <nav
          className={`absolute top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-2 transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >

        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 sm:px-6 py-3 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <a href="/" className="flex-shrink-0">
              <img src="/logo-transpesa.png" alt="Grupo Transpesa" className="h-8 w-auto" />
            </a>

            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-red-600 text-sm font-medium transition-colors">
                {t("navHome")}
              </a>
              <a href="/about" className="text-gray-700 hover:text-red-600 text-sm font-medium transition-colors">
                {t("navAbout")}
              </a>

              <div
                className="relative"
                onMouseEnter={() => setIsServicesMenuOpen(true)}
                onMouseLeave={() => setIsServicesMenuOpen(false)}
              >
                <a
                  href="/services"
                  className="flex items-center text-gray-700 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  {t("navServices")}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </a>
                <AnimatePresence>
                  {isServicesMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 p-1.5"
                    >
                      {serviceLinks.map((link) => (
                        <a
                          key={link.key}
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md whitespace-nowrap"
                        >
                          {t(link.key)}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="/blog" className="text-gray-700 hover:text-red-600 text-sm font-medium transition-colors">
                {t("navBlog")}
              </a>

              <a href="/contacto" className="text-gray-700 hover:text-red-600 text-sm font-medium transition-colors">
                {t("navContact")}
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${i18n.language === "en" ? "bg-red-600 text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"}`}
                >
                  ENG
                </button>
                <button
                  onClick={() => changeLanguage("es")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${i18n.language === "es" ? "bg-red-600 text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"}`}
                >
                  ESP
                </button>
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
          >
            <header className="flex items-center justify-between p-4 border-b border-gray-200">
              <a href="/">
                <img src="/logo-transpesa.png" alt="Grupo Transpesa" className="h-8 w-auto" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </header>
            <div className="flex flex-col items-center justify-center flex-1 h-full">
              <div className="flex flex-col items-center space-y-6 text-center">
                <a
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray-800 hover:text-red-600 font-medium"
                >
                  {t("navHome")}
                </a>
                <a
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray-800 hover:text-red-600 font-medium"
                >
                  {t("navAbout")}
                </a>

                <div className="w-full">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="flex items-center justify-center w-full text-2xl text-gray-800 hover:text-red-600 font-medium"
                  >
                    {t("navServices")}
                    <ChevronDown
                      className={`h-6 w-6 ml-2 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          {serviceLinks.map((link) => (
                            <a
                              key={link.key}
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="text-xl text-gray-600 hover:text-red-600"
                            >
                              {t(link.key)}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href="/contacto"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray-800 hover:text-red-600 font-medium"
                >
                  {t("navContact")}
                </a>
              </div>
              <div className="absolute bottom-10 flex items-center space-x-4">
                <button
                  onClick={() => {
                    changeLanguage("en")
                    setIsOpen(false)
                  }}
                  className={`px-4 py-2 text-base rounded-lg ${i18n.language === "en" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  ENG
                </button>
                <button
                  onClick={() => {
                    changeLanguage("es")
                    setIsOpen(false)
                  }}
                  className={`px-4 py-2 text-base rounded-lg ${i18n.language === "es" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  ESP
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
