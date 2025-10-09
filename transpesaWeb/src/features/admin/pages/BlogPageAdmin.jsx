import { useState, useEffect, useCallback } from "react"
import { PlusCircle, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import BlogFormModal from "../components/blog-components/BlogFormModal"
import ConfirmationModal from "../components/blog-components/ConfirmationModal"
import useApi from "@/hooks/useApi"
import { format } from "date-fns"

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-red-600"></div>
  </div>
)

const EmptyState = ({ onOpenCreateModal }) => (
  <div className="text-center py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">No hay posts todavía</h3>
    <p className="text-sm sm:text-base text-gray-500 mt-2 mb-4 sm:mb-6">
      ¡Comienza creando tu primer artículo para el blog!
    </p>
    <button
      onClick={onOpenCreateModal}
      className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors text-sm"
    >
      <PlusCircle className="mr-2 h-5 w-5" />
      Crear Nuevo Post
    </button>
  </div>
)

export default function BlogPageAdmin() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [postToEdit, setPostToEdit] = useState(null)

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)

  const api = useApi()

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.get("/admin/blog/posts")
      setPosts(data)
      setError(null)
    } catch (err) {
      setError(err.message || "Error al cargar los posts. Por favor, inténtalo de nuevo.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [api])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleOpenCreateModal = () => {
    setPostToEdit(null)
    setIsFormModalOpen(true)
  }

  const handleOpenEditModal = (post) => {
    setPostToEdit(post)
    setIsFormModalOpen(true)
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false)
    setPostToEdit(null)
  }

  const handleSave = () => {
    handleCloseFormModal()
    fetchPosts()
  }

  const handleOpenConfirmModal = (post) => {
    setPostToDelete(post)
    setIsConfirmModalOpen(true)
  }

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false)
    setPostToDelete(null)
  }

  const handleDelete = async () => {
    if (!postToDelete) return
    try {
      await api.delete(`/admin/blog/posts/${postToDelete.id}`)
      handleCloseConfirmModal()
      fetchPosts()
    } catch (err) {
      console.error("Error al eliminar:", err)
      setError(err.message || "No se pudo eliminar el post.")
    }
  }

  const handleTogglePublish = async (post) => {
    console.log("[v0] Toggling publish state for post:", post.id, "Current state:", post.isPublished)
    try {
      const response = await api.patch(`/admin/blog/posts/${post.id}/toggle-publish`, {})
      console.log("[v0] Toggle response:", response)
      fetchPosts()
    } catch (err) {
      console.error("[v0] Error al cambiar estado:", err)
      setError(err.message || "No se pudo actualizar el estado del post.")
    }
  }

  return (
    <div className="p-3 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Administrar Blog</h1>
          <button
            onClick={handleOpenCreateModal}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors text-sm"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Crear Post
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {loading ? (
            <LoadingSpinner />
          ) : posts.length === 0 ? (
            <EmptyState onOpenCreateModal={handleOpenCreateModal} />
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Título
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Categoría
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Estado
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(post.date), "dd/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              post.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.isPublished ? "Publicado" : "Borrador"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleTogglePublish(post)}
                              title={post.isPublished ? "Ocultar" : "Publicar"}
                              className={`p-2 rounded-full transition ${
                                post.isPublished
                                  ? "text-green-600 hover:text-green-800 hover:bg-green-50"
                                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {post.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(post)}
                              title="Editar"
                              className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-gray-100 transition"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleOpenConfirmModal(post)}
                              title="Eliminar"
                              className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-gray-100 transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{post.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{post.author}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                          post.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.isPublished ? "Publicado" : "Borrador"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span>{format(new Date(post.date), "dd/MM/yyyy")}</span>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`p-2 rounded-lg transition ${
                          post.isPublished
                            ? "text-green-600 hover:text-green-800 hover:bg-green-50"
                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        }`}
                        aria-label={post.isPublished ? "Ocultar" : "Publicar"}
                      >
                        {post.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(post)}
                        className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition"
                        aria-label="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleOpenConfirmModal(post)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <BlogFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSave}
        postToEdit={postToEdit}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que quieres eliminar el post "${postToDelete?.title}"? Esta acción no se puede deshacer.`}
      />
    </div>
  )
}
