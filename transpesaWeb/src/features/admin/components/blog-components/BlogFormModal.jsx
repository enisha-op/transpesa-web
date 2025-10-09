import { useState, useEffect } from "react"
import { X } from "lucide-react"
import useApi from "@/hooks/useApi"

const initialFormData = {
  title: "",
  category: "",
  imageUrl: "",
  author: "",
  authorImage: "",
  authorBio: "",
  date: new Date().toISOString().split("T")[0],
  excerpt: "",
  content: "",
  isPublished: true,
}

export default function BlogFormModal({ isOpen, onClose, onSave, postToEdit }) {
  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const api = useApi()

  useEffect(() => {
    if (postToEdit) {
      setIsLoading(true)
      api
        .get(`/admin/blog/posts/${postToEdit.id}`)
        .then((fullPost) => {
          setFormData({
            ...fullPost,
            date: new Date(fullPost.date).toISOString().split("T")[0],
            imageUrl: fullPost.image_url,
            authorImage: fullPost.author_image,
            authorBio: fullPost.author_bio,
            isPublished: fullPost.is_published,
          })
        })
        .catch((err) => {
          console.error("Error fetching post details:", err)
          setError(err.message || "No se pudo cargar la información completa del post.")
        })
        .finally(() => setIsLoading(false))
    } else {
      setFormData(initialFormData)
    }
  }, [postToEdit])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (postToEdit) {
        await api.put(`/admin/blog/posts/${postToEdit.id}`, formData)
      } else {
        await api.post("/admin/blog/posts", formData)
      }
      onSave()
    } catch (err) {
      console.error("Error al guardar:", err)
      setError(err.message || "Ocurrió un error al guardar el post.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-3 sm:p-4 border-b sticky top-0 bg-white rounded-t-lg z-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {postToEdit ? "Editar Post" : "Crear Nuevo Post"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
          </button>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 flex-1">
          {isLoading && <p className="text-center text-gray-500">Cargando...</p>}
          {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría *
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              URL de la Imagen Principal *
            </label>
            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Autor *
              </label>
              <input
                type="text"
                name="author"
                id="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="authorImage" className="block text-sm font-medium text-gray-700 mb-1">
                URL Imagen del Autor
              </label>
              <input
                type="url"
                name="authorImage"
                id="authorImage"
                value={formData.authorImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="authorBio" className="block text-sm font-medium text-gray-700 mb-1">
              Biografía del Autor
            </label>
            <textarea
              name="authorBio"
              id="authorBio"
              rows="2"
              value={formData.authorBio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Publicación *
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Extracto (Resumen) *
            </label>
            <textarea
              name="excerpt"
              id="excerpt"
              rows="3"
              value={formData.excerpt}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Contenido (Markdown o HTML) *
            </label>
            <textarea
              name="content"
              id="content"
              rows="8"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm font-mono"
            />
          </div>

          <div className="flex items-center">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
              ¿Publicar inmediatamente?
            </label>
          </div>
        </form>

        {/* Footer */}
        <footer className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-2 p-3 sm:p-4 border-t bg-gray-50 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </footer>
      </div>
    </div>
  )
}
