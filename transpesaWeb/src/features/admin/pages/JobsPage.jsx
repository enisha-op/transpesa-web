import { useState, useEffect } from "react"
import useApi from "@/hooks/useApi"
import JobFormModal from "../components/JobFormModal"
import { Plus, Edit2, Trash2, Calendar, CheckCircle2, XCircle, Search, Filter, Briefcase } from "lucide-react"

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all") // 'all', 'active', 'inactive'
  const api = useApi()

  const fetchJobs = async () => {
    try {
      const data = await api.get("/admin/jobs")
      setJobs(data)
    } catch (error) {
      console.error("Error al cargar los puestos:", error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleSave = async (jobData) => {
    try {
      if (selectedJob) {
        await api.put(`/jobs/${selectedJob.id}`, jobData)
      } else {
        await api.post("/jobs", jobData)
      }
      setIsModalOpen(false)
      setSelectedJob(null)
      fetchJobs()
    } catch (error) {
      console.error("Error al guardar el puesto:", error)
    }
  }

  const handleDelete = async (jobId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este puesto?")) {
      try {
        await api.delete(`/jobs/${jobId}`)
        fetchJobs()
      } catch (error) {
        console.error("Error al eliminar el puesto:", error)
      }
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && job.isActive) ||
      (filterStatus === "inactive" && !job.isActive)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Puestos de Trabajo</h1>
              <p className="text-sm text-gray-600 mt-1">Gestiona las ofertas laborales de tu empresa</p>
            </div>
            <button
              onClick={() => {
                setSelectedJob(null)
                setIsModalOpen(true)
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 font-medium text-sm hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Crear Nuevo Puesto</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white text-sm font-medium"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>

        <JobFormModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay puestos disponibles</h3>
            <p className="text-gray-600 text-sm">
              {searchTerm || filterStatus !== "all"
                ? "No se encontraron resultados con los filtros aplicados"
                : "Comienza creando tu primer puesto de trabajo"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300 overflow-hidden group"
              >
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight flex-1 group-hover:text-red-600 transition-colors">
                      {job.title}
                    </h3>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        job.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {job.isActive ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Activo
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          Inactivo
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Publicado: {job.publicationDate}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Requisitos</h4>
                  <ul className="space-y-2 mb-5">
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span className="flex-1">{req}</span>
                      </li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="text-xs text-gray-500 italic">+{job.requirements.length - 3} requisitos más...</li>
                    )}
                  </ul>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedJob(job)
                        setIsModalOpen(true)
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-all font-medium text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-100 transition-all font-medium text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredJobs.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Mostrando {filteredJobs.length} de {jobs.length} puestos
          </div>
        )}
      </div>
    </div>
  )
}
