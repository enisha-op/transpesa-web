import { useState, useEffect, useCallback } from "react";
import { PlusCircle, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import BlogFormModal from "../components/blog-components/BlogFormModal";
import ConfirmationModal from "../components/blog-components/ConfirmationModal";
import useApi from "@/hooks/useApi";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importar el locale en español

// --- Componentes Reutilizables ---

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
  </div>
);

const EmptyState = ({ onOpenCreateModal }) => (
  <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
    <h3 className="text-xl font-semibold text-gray-800">No hay posts todavía</h3>
    <p className="text-base text-gray-500 mt-2 mb-6">
      ¡Comienza creando tu primer artículo para el blog!
    </p>
    <button
      onClick={onOpenCreateModal}
      className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
    >
      <PlusCircle className="mr-2 h-5 w-5" />
      Crear Nuevo Post
    </button>
  </div>
);

// Componente para el badge de estado (Publicado/Borrador)
const StatusBadge = ({ isPublished }) => (
  <span
    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
      isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
    }`}
  >
    {isPublished ? "Publicado" : "Borrador"}
  </span>
);

// Componente para los botones de acción
const PostActions = ({ post, onEdit, onDelete, onTogglePublish }) => (
  <div className="flex justify-end items-center gap-1 sm:gap-2">
    <button
      onClick={() => onTogglePublish(post)}
      title={post.isPublished ? "Ocultar" : "Publicar"}
      className={`p-2 rounded-full transition ${
        post.isPublished
          ? "text-green-600 hover:bg-green-100"
          : "text-gray-400 hover:bg-gray-100"
      }`}
    >
      {post.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
    </button>
    <button
      onClick={() => onEdit(post)}
      title="Editar"
      className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
    >
      <Edit size={18} />
    </button>
    <button
      onClick={() => onDelete(post)}
      title="Eliminar"
      className="p-2 rounded-full text-red-600 hover:bg-red-100 transition"
    >
      <Trash2 size={18} />
    </button>
  </div>
);


// --- Componente Principal ---

export default function BlogPageAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const api = useApi();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get("/admin/blog/posts");
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Error al cargar los posts.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // --- Handlers para modales y acciones ---
  const handleOpenCreateModal = () => {
    setPostToEdit(null);
    setIsFormModalOpen(true);
  };
  const handleOpenEditModal = (post) => {
    setPostToEdit(post);
    setIsFormModalOpen(true);
  };
  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setPostToEdit(null);
  };
  const handleSave = () => {
    handleCloseFormModal();
    fetchPosts();
  };
  const handleOpenConfirmModal = (post) => {
    setPostToDelete(post);
    setIsConfirmModalOpen(true);
  };
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setPostToDelete(null);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    try {
      await api.delete(`/admin/blog/posts/${postToDelete.id}`);
      handleCloseConfirmModal();
      fetchPosts();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el post.");
    }
  };

  const handleTogglePublish = async (post) => {
    try {
      await api.patch(`/admin/blog/posts/${post.id}/toggle-publish`, {});
      await fetchPosts(); // Esperar a que los posts se actualicen
    } catch (err) {
      setError(err.message || "No se pudo actualizar el estado del post.");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Administrar Blog</h1>
          <button
            onClick={handleOpenCreateModal}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Crear Post
          </button>
        </header>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <main className="bg-white shadow-lg rounded-lg overflow-hidden">
          {loading ? (
            <LoadingSpinner />
          ) : posts.length === 0 ? (
            <EmptyState onOpenCreateModal={handleOpenCreateModal} />
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.author}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(post.date), "dd MMMM yyyy", { locale: es })}
                        </td>
                        <td className="px-6 py-4"><StatusBadge isPublished={post.isPublished} /></td>
                        <td className="px-6 py-4"><PostActions post={post} onEdit={handleOpenEditModal} onDelete={handleOpenConfirmModal} onTogglePublish={handleTogglePublish}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {posts.map((post) => (
                  <div key={post.id} className="p-4">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-500">{post.author}</p>
                      </div>
                      <div className="flex-shrink-0"><StatusBadge isPublished={post.isPublished} /></div>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="text-sm text-gray-500 space-y-1">
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium block w-fit">
                          {post.category}
                        </span>
                        <span>{format(new Date(post.date), "dd MMMM yyyy", { locale: es })}</span>
                      </div>
                       <PostActions post={post} onEdit={handleOpenEditModal} onDelete={handleOpenConfirmModal} onTogglePublish={handleTogglePublish}/>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <BlogFormModal isOpen={isFormModalOpen} onClose={handleCloseFormModal} onSave={handleSave} postToEdit={postToEdit}/>
      <ConfirmationModal isOpen={isConfirmModalOpen} onClose={handleCloseConfirmModal} onConfirm={handleDelete} title="Confirmar Eliminación" message={`¿Estás seguro de que quieres eliminar el post "${postToDelete?.title}"? Esta acción no se puede deshacer.`}/>
    </div>
  );
}