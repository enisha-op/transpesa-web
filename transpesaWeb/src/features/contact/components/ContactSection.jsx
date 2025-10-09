"use client"

import { useState } from "react"
import { useTranslation, Trans } from "react-i18next"
import useApi from "@/hooks/useApi"

const AlertMessage = ({ type, message, onClose }) => {
  const isSuccess = type === "success"
  const bgColor = isSuccess ? "bg-green-50" : "bg-red-50"
  const borderColor = isSuccess ? "border-green-500" : "border-red-500"
  const textColor = isSuccess ? "text-green-800" : "text-red-800"
  const iconColor = isSuccess ? "text-green-500" : "text-red-500"

  return (
    <div
      className={`${bgColor} border-l-4 ${borderColor} p-4 rounded-md shadow-md animate-in fade-in slide-in-from-top-2 duration-300`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {isSuccess ? (
            <svg className={`h-5 w-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className={`h-5 w-5 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onClose}
            className={`inline-flex rounded-md ${bgColor} p-1.5 ${textColor} hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSuccess ? "focus:ring-green-500" : "focus:ring-red-500"}`}
          >
            <span className="sr-only">Cerrar</span>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const FloatingLabelInput = ({ type, name, label, value, onChange, isTextArea = false, error, required = false }) => {
  const hasError = !!error
  const borderColor = hasError ? "border-red-500" : "border-red-500"
  const focusBorderColor = "focus:border-red-600"
  const labelColor = hasError ? "text-red-600" : "text-gray-500"
  const focusLabelColor = "peer-focus:text-red-600"

  const commonProps = {
    id: name,
    name: name,
    value: value,
    onChange: onChange,
    className: `peer block w-full appearance-none border-0 border-b-2 ${borderColor} bg-transparent px-0 py-2.5 text-sm text-gray-900 ${focusBorderColor} focus:outline-none focus:ring-0 transition-colors`,
    placeholder: " ",
  }

  const labelProps = {
    htmlFor: name,
    className: `absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${labelColor} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 ${focusLabelColor}`,
  }

  return (
    <div className="relative z-0">
      {isTextArea ? <textarea {...commonProps} rows="3"></textarea> : <input type={type} {...commonProps} />}
      <label {...labelProps}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {hasError && (
        <p className="mt-1 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">{error}</p>
      )}
    </div>
  )
}

export default function ContactSection() {
  const { t } = useTranslation()
  const api = useApi()

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    company: "",
    query: "",
    terms_accepted: false,
    marketing_accepted: false,
  }

  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Limpiar el error del campo cuando el usuario empieza a escribir
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors = {}

    // Validar nombre
    if (!formData.name.trim()) {
      errors.name = "El nombre es obligatorio"
    } else if (formData.name.trim().length < 2) {
      errors.name = "El nombre debe tener al menos 2 caracteres"
    }

    // Validar email con regex
    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es obligatorio"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        errors.email = "Por favor ingresa un correo electrónico válido"
      }
    }

    // Validar consulta
    if (!formData.query.trim()) {
      errors.query = "La consulta es obligatoria"
    } else if (formData.query.trim().length < 10) {
      errors.query = "La consulta debe tener al menos 10 caracteres"
    }

    // Validar aceptación de términos (obligatorio)
    if (!formData.terms_accepted) {
      errors.terms_accepted = "Debes aceptar los términos y condiciones"
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Ejecutar validaciones
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setErrorMessage("Por favor corrige los errores en el formulario")

      // Hacer scroll al primer campo con error
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

            {(successMessage || errorMessage) && (
              <div className="mt-6">
                {successMessage && (
                  <AlertMessage type="success" message={successMessage} onClose={() => setSuccessMessage("")} />
                )}
                {errorMessage && (
                  <AlertMessage type="error" message={errorMessage} onClose={() => setErrorMessage("")} />
                )}
              </div>
            )}

            <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
              <FloatingLabelInput
                type="text"
                name="name"
                label={t("contactFieldName")}
                value={formData.name}
                onChange={handleChange}
                error={fieldErrors.name}
                required
              />
              <FloatingLabelInput
                type="email"
                name="email"
                label={t("contactFieldEmail")}
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                required
              />
              <FloatingLabelInput
                type="tel"
                name="phone"
                label={t("contactFieldPhone")}
                value={formData.phone}
                onChange={handleChange}
                error={fieldErrors.phone}
              />
              <FloatingLabelInput
                type="text"
                name="company"
                label={t("contactFieldCompany")}
                value={formData.company}
                onChange={handleChange}
                error={fieldErrors.company}
              />
              <FloatingLabelInput
                name="query"
                label={t("contactFieldQuery")}
                isTextArea={true}
                value={formData.query}
                onChange={handleChange}
                error={fieldErrors.query}
                required
              />

              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms_accepted"
                    type="checkbox"
                    className={`h-4 w-4 shrink-0 accent-red-600 ${fieldErrors.terms_accepted ? "ring-2 ring-red-500" : ""}`}
                    checked={formData.terms_accepted}
                    onChange={handleChange}
                  />
                  <label htmlFor="terms" className="ml-2 text-xs text-gray-500">
                    <Trans i18nKey="contactCheckboxTerms">
                      <a
                        href="/terminos-y-condiciones"
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                      <a
                        href="/politica-de-privacidad"
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
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
                    id="marketing"
                    name="marketing_accepted"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 accent-red-600"
                    checked={formData.marketing_accepted}
                    onChange={handleChange}
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
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {isLoading ? "Enviando..." : t("contactButtonSubmit")}
                </button>
              </div>
            </form>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 -top-4 -right-4 bg-red-600" style={{ zIndex: 0 }}></div>
            <div className="relative h-full w-4/5" style={{ zIndex: 1 }}>
              <img src="/camion4.jpg" alt={t("contactImageAlt")} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
