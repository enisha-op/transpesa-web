import { useState, useEffect } from "react"
import { X, Briefcase, Calendar, FileText, ToggleLeft, ToggleRight, Plus, Trash2 } from "lucide-react"

export default function JobFormModal({ job, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("")
  const [requirements, setRequirements] = useState([""])
  const [publicationDate, setPublicationDate] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (job && isOpen) {
      setTitle(job.title || "")
      setRequirements(job.requirements && job.requirements.length > 0 ? job.requirements : [""])
      setPublicationDate(job.publicationDate ? job.publicationDate.split("/").reverse().join("-") : "")
      setIsActive(job.isActive !== undefined ? job.isActive : true)
    } else {
      setTitle("")
      setRequirements([""])
      setPublicationDate("")
      setIsActive(true)
    }
  }, [job, isOpen])

  if (!isOpen) return null

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...requirements]
    newRequirements[index] = value
    setRequirements(newRequirements)
  }

  const addRequirement = () => {
    setRequirements([...requirements, ""])
  }

  const removeRequirement = (index) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const finalData = {
      title,
      requirements: requirements.filter((req) => req.trim() !== ""),
      publicationDate,
      isActive,
    }
    onSave(finalData)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{job ? "Editar Puesto" : "Crear Nuevo Puesto"}</h2>
                <p className="text-red-100 text-sm">Completa la información del puesto de trabajo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título del puesto */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 text-red-600" />
              Título del Puesto
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
              placeholder="Ej: Desarrollador Full Stack"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-red-600" />
                Requisitos del Puesto
              </label>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                      {index + 1}.
                    </span>
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                      placeholder="Escribe un requisito..."
                      required
                    />
                  </div>
                  {requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
                      aria-label="Eliminar requisito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Agrega todos los requisitos necesarios para el puesto</p>
          </div>

          {/* Fecha de publicación */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-red-600" />
              Fecha de Publicación
            </label>
            <input
              type="date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
              required
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isActive ? (
                  <ToggleRight className="w-6 h-6 text-green-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900">Estado del Puesto</p>
                  <p className="text-xs text-gray-600">
                    {isActive ? "Visible en la web pública" : "Oculto de la web pública"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                  isActive ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                    isActive ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all font-medium text-sm hover:scale-[1.02]"
            >
              {job ? "Guardar Cambios" : "Crear Puesto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
