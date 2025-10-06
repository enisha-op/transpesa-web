"use client"

import { useState, useEffect, forwardRef } from "react"
import { useTranslation } from "react-i18next"
import useApi from "@/hooks/useApi"

const FloatingLabelInput = ({ name, label, type = "text", value, onChange, disabled = false }) => (
  <div className="relative z-0">
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
      placeholder=" "
    />
    <label
      htmlFor={name}
      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600"
    >
      {label}
    </label>
  </div>
)

const ApplicationSection = forwardRef(({ selectedJob }, ref) => {
  const { t } = useTranslation()
  const api = useApi()
  const [fileName, setFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    celular: "",
    puesto: "",
    jobId: null,
  })

  useEffect(() => {
    if (selectedJob) {
      setFormData((prev) => ({
        ...prev,
        puesto: selectedJob.title,
        jobId: selectedJob.id,
      }))
    }
  }, [selectedJob])

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name)
    } else {
      setFileName("")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("jobId", formData.jobId)
      formDataToSend.append("nombres", formData.nombres)
      formDataToSend.append("apellidos", formData.apellidos)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("celular", formData.celular)

      const cvFile = document.getElementById("cv-upload").files[0]
      if (cvFile) {
        formDataToSend.append("cv", cvFile)
      }

      const BASE_URL = import.meta.env.VITE_API_BASE_URL
      const response = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.msg || "Error al enviar la postulación")
      }

      alert(t("applicationSuccessMessage") || "Postulación enviada exitosamente!")
      setFormData({
        nombres: "",
        apellidos: "",
        email: "",
        celular: "",
        puesto: "",
        jobId: null,
      })
      setFileName("")
      document.getElementById("cv-upload").value = ""
    } catch (error) {
      console.error("Error:", error)
      alert(error.message || "Error al enviar la postulación")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-white" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-5 lg:items-stretch">
          <div className="py-16 px-6 sm:px-8 lg:col-span-3 lg:py-24 order-2 lg:order-none">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">{t("applicationMainTitle")}</h2>
            <p className="mt-2 text-base sm:text-lg text-gray-600">{t("applicationMainSubtitle")}</p>

            <form className="mt-12 flex flex-col gap-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                <FloatingLabelInput
                  name="nombres"
                  label={t("applicationFieldFirstName")}
                  value={formData.nombres}
                  onChange={handleInputChange}
                />
                <FloatingLabelInput
                  name="apellidos"
                  label={t("applicationFieldLastName")}
                  value={formData.apellidos}
                  onChange={handleInputChange}
                />
              </div>
              <FloatingLabelInput
                name="email"
                label={t("applicationFieldEmail")}
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <FloatingLabelInput
                name="celular"
                label={t("applicationFieldPhone")}
                type="tel"
                value={formData.celular}
                onChange={handleInputChange}
              />
              <FloatingLabelInput
                name="puesto"
                label={t("applicationFieldPosition")}
                value={formData.puesto}
                onChange={handleInputChange}
                disabled={!!selectedJob}
              />
              <div>
                <label className="text-sm text-gray-500">{t("applicationLabelCV")}</label>
                <div className="mt-2 flex items-center gap-4">
                  <label
                    htmlFor="cv-upload"
                    className="cursor-pointer rounded-md border border-red-600 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    {t("applicationButtonSelectFile")}
                  </label>
                  <span className="text-sm text-gray-600 truncate">{fileName || t("applicationLabelNoFile")}</span>
                  <input
                    id="cv-upload"
                    name="cv-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </div>
              <div className="flex justify-center sm:justify-start pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-md bg-red-600 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t("applicationButtonSubmitting") || "Enviando..." : t("applicationButtonSubmit")}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-none">
            <div className="flex h-full flex-col bg-red-600 px-6 py-16 sm:px-8 text-white relative overflow-hidden">
              <div className="absolute top-6 right-6 space-y-1.5">
                {/* <div className="h-0.5 w-20 bg-white/90"></div>
                <div className="h-0.5 w-16 bg-white/90"></div>
                <div className="h-0.5 w-12 bg-white/90"></div> */}
              </div>
              <div className="flex flex-col justify-center flex-1 pt-20">
                <h3 className="text-3xl lg:text-5xl font-bold font-inria italic leading-tight mb-16">{t("applicationBrandTitle")}</h3>
                <p className="text-lg lg:text-2xl leading-relaxed text-white/95">{t("applicationBrandSubtitle")}</p>
              </div>
              <div className="mt-8 flex justify-center">
                <img
                  src="/logo-transpesa-blanco.png"
                  alt={t("applicationBrandLogoAlt")}
                  className="h-auto w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

ApplicationSection.displayName = "ApplicationSection"

export default ApplicationSection
