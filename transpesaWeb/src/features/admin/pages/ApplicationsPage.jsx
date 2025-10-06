import { useState, useEffect, useMemo } from "react"
import { Search, Filter, User, Trash2, Download, X, FileText, Calendar, Mail, Briefcase } from "lucide-react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("accessToken")

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    console.error("Error de autenticación. Redirigiendo a login...")
    throw new Error("No autorizado. Por favor, inicia sesión de nuevo.")
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ msg: "Ocurrió un error desconocido" }))
    throw new Error(errorData.msg || "La respuesta de la red no fue exitosa")
  }

  const contentType = response.headers.get("content-type")
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json()
  }
  return
}

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Nuevo: "bg-blue-500 text-white",
    Revisado: "bg-yellow-500 text-white",
    Contactado: "bg-green-500 text-white",
    Rechazado: "bg-red-500 text-white",
    default: "bg-gray-500 text-white",
  }
  const style = statusStyles[status] || statusStyles["default"]
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${style} inline-block`}>{status}</span>
}

const CVModal = ({ isOpen, onClose, filename }) => {
  const [pdfUrl, setPdfUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen && filename) {
      loadPDF()
    }
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [isOpen, filename])

  const loadPDF = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`${API_BASE_URL}/admin/cv/view/${filename}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Error al cargar el CV")

      const blob = await response.blob()
      const pdfBlob = new Blob([blob], { type: "application/pdf" })
      const url = URL.createObjectURL(pdfBlob)
      setPdfUrl(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (pdfUrl) {
      const a = document.createElement("a")
      a.href = pdfUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Vista previa del CV</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Descargar PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {loading && (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-gray-500">Cargando CV...</div>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4">
              <div className="text-red-500">{error}</div>
              <button
                onClick={loadPDF}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}
          {pdfUrl && !loading && (
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              className="w-full h-full min-h-[70vh] rounded-lg border border-gray-200"
              title="CV Preview"
              type="application/pdf"
            />
          )}
        </div>
      </div>
    </div>
  )
}

const ApplicationCard = ({ app, onDelete, onStatusChange, onViewCV, onDownloadCV }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base mb-1">{app.first_name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <Mail className="w-3 h-3" />
            <span className="truncate">{app.email}</span>
          </div>
        </div>
        <StatusBadge status={app.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{app.job_title}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span>{app.application_date}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <select
          value={app.status}
          onChange={(e) => onStatusChange(app.id, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="Nuevo">Nuevo</option>
          <option value="Revisado">Revisado</option>
          <option value="Contactado">Contactado</option>
          <option value="Rechazado">Rechazado</option>
        </select>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onViewCV(app.cv_filename)}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            <span>Ver</span>
          </button>
          <button
            onClick={() => onDownloadCV(app.cv_filename)}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Descargar</span>
          </button>
          <button
            onClick={() => onDelete(app.id)}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCV, setSelectedCV] = useState(null)

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const data = await apiFetch("/admin/applications", { method: "GET" })
      setApplications(data)
    } catch (error) {
      console.error("Error al cargar las postulaciones:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleDelete = async (appId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta postulación? Esta acción es irreversible.")) {
      try {
        await apiFetch(`/admin/applications/${appId}`, { method: "DELETE" })
        setApplications((prev) => prev.filter((app) => app.id !== appId))
      } catch (error) {
        console.error("Error al eliminar la postulación:", error)
        alert("Error al eliminar la postulación")
      }
    }
  }

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await apiFetch(`/admin/applications/${appId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      })
      setApplications((prev) => prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app)))
    } catch (error) {
      console.error("Error al actualizar el estado:", error)
      alert("Error al actualizar el estado")
    }
  }

  const handleViewCV = (filename) => {
    setSelectedCV(filename)
    setModalOpen(true)
  }

  const handleDownloadCV = async (filename) => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`${API_BASE_URL}/admin/cv/download/${filename}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Error al descargar el CV")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al descargar el CV:", error)
      alert("Error al descargar el CV")
    }
  }

  const filteredApplications = useMemo(() => {
    if (!Array.isArray(applications)) return []
    return applications.filter((app) => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        app.first_name.toLowerCase().includes(searchLower) ||
        app.email.toLowerCase().includes(searchLower) ||
        (app.job_title && app.job_title.toLowerCase().includes(searchLower))

      const matchesFilter = filterStatus === "all" || app.status === filterStatus

      return matchesSearch && matchesFilter
    })
  }, [applications, searchTerm, filterStatus])

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Postulaciones Recibidas</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Administra los candidatos para tus ofertas de trabajo.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o puesto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-xs sm:text-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white text-xs sm:text-sm font-medium"
              >
                <option value="all">Todos los estados</option>
                <option value="Nuevo">Nuevos</option>
                <option value="Revisado">Revisados</option>
                <option value="Contactado">Contactados</option>
                <option value="Rechazado">Rechazados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center text-gray-500">
            Cargando postulaciones...
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No hay postulaciones</h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              {searchTerm || filterStatus !== "all"
                ? "No se encontraron postulaciones con los filtros aplicados"
                : "Aún no se ha recibido ninguna postulación"}
            </p>
          </div>
        ) : (
          <>
            <div className="block md:hidden space-y-3">
              {filteredApplications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  onViewCV={handleViewCV}
                  onDownloadCV={handleDownloadCV}
                />
              ))}
            </div>

            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Candidato
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Puesto Aplicado
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Fecha
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="bg-white border-b hover:bg-red-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div>{app.first_name}</div>
                          <div className="text-xs text-gray-500">{app.email}</div>
                        </td>
                        <td className="px-6 py-4">{app.job_title}</td>
                        <td className="px-6 py-4">{app.application_date}</td>
                        <td className="px-6 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="Nuevo">Nuevo</option>
                            <option value="Revisado">Revisado</option>
                            <option value="Contactado">Contactado</option>
                            <option value="Rechazado">Rechazado</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewCV(app.cv_filename)}
                              className="p-2 text-gray-500 rounded-lg hover:bg-green-100 hover:text-green-600 transition-colors"
                              title="Ver CV"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownloadCV(app.cv_filename)}
                              className="p-2 text-gray-500 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
                              title="Descargar CV"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="p-2 text-gray-500 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        {filteredApplications.length > 0 && (
          <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
            Mostrando {filteredApplications.length} de {applications.length} postulaciones
          </div>
        )}
      </div>

      <CVModal isOpen={modalOpen} onClose={() => setModalOpen(false)} filename={selectedCV} />
    </div>
  )
}
