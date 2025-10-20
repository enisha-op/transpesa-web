import { useState, useEffect } from "react"
import { useTranslation, Trans } from "react-i18next"
import useApi from "@/hooks/useApi"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, X } from "lucide-react"

// --- COMPONENTE DE ALERTA MEJORADO ---
const AlertMessage = ({ type, message, onClose }) => {
  const isSuccess = type === "success"
  const config = {
    success: { bgColor: "bg-green-50", borderColor: "border-green-200", textColor: "text-green-800", icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> },
    error: { bgColor: "bg-red-50", borderColor: "border-red-200", textColor: "text-red-800", icon: <AlertTriangle className="h-5 w-5 text-red-500" /> },
  }
  const alertConfig = isSuccess ? config.success : config.error

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`${alertConfig.bgColor} border ${alertConfig.borderColor} p-4 rounded-lg shadow-md w-full`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{alertConfig.icon}</div>
        <div className="flex-1">
          <h3 className={`text-sm font-semibold ${alertConfig.textColor}`}>{isSuccess ? "¡Éxito!" : "Ocurrió un error"}</h3>
          <p className={`text-sm ${alertConfig.textColor} opacity-90 mt-1`}>{message}</p>
        </div>
        <div className="flex-shrink-0">
          <button onClick={onClose} className={`p-1 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSuccess ? "focus:ring-green-600" : "focus:ring-red-600"}`}>
            <X className={`h-4 w-4 ${alertConfig.textColor}`} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// --- COMPONENTE DE INPUT ---
const FloatingLabelInput = ({ type, name, label, value, onChange, isTextArea = false, error, required = false }) => {
  const hasError = !!error
  const borderColor = hasError ? "border-red-500" : "border-gray-300"
  const focusBorderColor = "focus:border-red-600"
  const labelColor = hasError ? "text-red-600" : "text-gray-500"
  const focusLabelColor = "peer-focus:text-red-600"

  const commonProps = { id: name, name: name, value: value, onChange: onChange, className: `peer block w-full appearance-none border-0 border-b-2 ${borderColor} bg-transparent px-0 py-2.5 text-sm text-gray-900 ${focusBorderColor} focus:outline-none focus:ring-0 transition-colors`, placeholder: " " }
  const labelProps = { htmlFor: name, className: `absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${labelColor} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ${focusLabelColor}` }

  return (
    <div className="relative z-0">
      {isTextArea ? <textarea {...commonProps} rows="3"></textarea> : <input type={type} {...commonProps} />}
      <label {...labelProps}>{label} {required && <span className="text-red-600">*</span>}</label>
      {hasError && <p className="mt-1 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">{error}</p>}
    </div>
  )
}

// --- COMPONENTE PRINCIPAL ---
export default function ContactSection() {
  const { t } = useTranslation()
  const api = useApi()
  const initialFormData = { name: "", email: "", phone: "", company: "", query: "", terms_accepted: false, marketing_accepted: false }
  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  // Efecto para auto-cerrar la alerta de éxito después de 5 segundos.
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); 
      }, 3000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, [successMessage]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: type === "checkbox" ? checked : value }))
    if (fieldErrors[name]) { setFieldErrors((prev) => ({ ...prev, [name]: "" })) }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = "El nombre es obligatorio"
    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Por favor ingresa un correo electrónico válido"
    }
    if (!formData.query.trim()) errors.query = "La consulta es obligatoria"
    if (!formData.terms_accepted) errors.terms_accepted = "Debes aceptar los términos y condiciones"
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setErrorMessage("Por favor corrige los errores en el formulario")
      const firstErrorField = Object.keys(errors)[0]
      document.getElementById(firstErrorField)?.focus()
      return
    }

    setIsLoading(true)
    setSuccessMessage("")
    setErrorMessage("")
    setFieldErrors({})

    try {
      const response = await api.post("/contact", formData)
      setSuccessMessage(response.message || "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.")
      setFormData(initialFormData)
    } catch (error) {
      setErrorMessage(error.message || "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">{t("contactMainTitle")}</h2>
            <p className="mt-2 text-gray-600">{t("contactMainSubtitle")}</p>
            <div className="mt-6">
              <AnimatePresence>
                {successMessage && <AlertMessage type="success" message={successMessage} onClose={() => setSuccessMessage("")} />}
                {errorMessage && <AlertMessage type="error" message={errorMessage} onClose={() => setErrorMessage("")} />}
              </AnimatePresence>
            </div>
            <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
              <FloatingLabelInput
                type="text" name="name" label={t("contactFieldName")} value={formData.name}
                onChange={handleChange} error={fieldErrors.name} required
              />
              <FloatingLabelInput
                type="email" name="email" label={t("contactFieldEmail")} value={formData.email}
                onChange={handleChange} error={fieldErrors.email} required
              />
              <FloatingLabelInput
                type="tel" name="phone" label={t("contactFieldPhone")} value={formData.phone}
                onChange={handleChange} error={fieldErrors.phone}
              />
              <FloatingLabelInput
                type="text" name="company" label={t("contactFieldCompany")} value={formData.company}
                onChange={handleChange} error={fieldErrors.company}
              />
              <FloatingLabelInput
                name="query" label={t("contactFieldQuery")} isTextArea={true} value={formData.query}
                onChange={handleChange} error={fieldErrors.query} required
              />
              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <input
                    id="terms" name="terms_accepted" type="checkbox"
                    className={`h-4 w-4 shrink-0 accent-red-600 ${fieldErrors.terms_accepted ? "ring-2 ring-red-500" : ""}`}
                    checked={formData.terms_accepted} onChange={handleChange}
                  />
                  <label htmlFor="terms" className="ml-2 text-xs text-gray-500">
                    <Trans i18nKey="contactCheckboxTerms">
                      <a href="/terminos-y-condiciones" className="underline" target="_blank" rel="noopener noreferrer" />
                      <a href="/politica-de-privacidad" className="underline" target="_blank" rel="noopener noreferrer" />
                    </Trans>
                    <span className="text-red-600"> *</span>
                  </label>
                </div>
                {fieldErrors.terms_accepted && (
                  <p className="text-xs text-red-600 ml-6 animate-in fade-in slide-in-from-top-1 duration-200">
                    {fieldErrors.terms_accepted}
                  </p>
                )}
                <div className="flex items-start">
                  <input
                    id="marketing" name="marketing_accepted" type="checkbox"
                    className="h-4 w-4 shrink-0 accent-red-600"
                    checked={formData.marketing_accepted} onChange={handleChange}
                  />
                  <label htmlFor="marketing" className="ml-2 text-xs text-gray-500">
                    {t("contactCheckboxMarketing")}
                  </label>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  className="rounded-md bg-red-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isLoading ? t('contactButtonSubmitting') : t('contactButtonSubmit')}
                </button>
              </div>
            </form>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 -top-4 -right-4 bg-red-600" style={{ zIndex: 0 }}></div>
            <div className="relative h-full w-4/5" style={{ zIndex: 1 }}>
              <img src="/camion4.jpg" alt={t("contactImageAlt")} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}