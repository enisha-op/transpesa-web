// src/features/admin/pages/AnunciosPage.jsx
import { useState, useEffect } from "react";
import { Upload, Trash2, List } from "lucide-react";
import useApi from "@/hooks/useApi"; // 1. Importa tu hook useApi

export default function AnunciosPage() {
  const api = useApi(); // 2. Inicializa el hook
  
  const [anuncios, setAnuncios] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const fetchAnuncios = async () => {
    try {
      // 3. Usa el hook para la llamada GET. El hook ya devuelve los datos directamente.
      const data = await api.get("/anuncios");
      setAnuncios(data);
    } catch (err) {
      console.error("Error al obtener anuncios:", err);
      setError("No se pudieron cargar los anuncios.");
    }
  };

  useEffect(() => {
    fetchAnuncios();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Por favor, selecciona una imagen para subir.");
      return;
    }
    const formData = new FormData();
    formData.append("anuncioImage", selectedFile);

    try {
      // 4. Usa el hook para la llamada POST. Manejará FormData automáticamente.
      await api.post("/anuncios/upload", formData);
      
      setSelectedFile(null);
      setError("");
      document.getElementById('file-input').value = '';
      fetchAnuncios();
    } catch (err) {
      console.error("Error al subir anuncio:", err);
      setError("Error al subir el anuncio. Inténtalo de nuevo.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este anuncio?")) {
      try {
        // 5. Usa el hook para la llamada DELETE.
        await api.delete(`/anuncios/${id}`);
        fetchAnuncios();
      } catch (err) {
        console.error("Error al eliminar anuncio:", err);
        setError("No se pudo eliminar el anuncio.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestionar Anuncios</h1>
      
      {/* Sección para Subir Anuncios */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Subir Nuevo Anuncio</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex items-center gap-4">
          <input 
            id="file-input"
            type="file" 
            onChange={handleFileChange} 
            className="flex-grow block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
          <button onClick={handleUpload} className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 flex items-center gap-2">
            <Upload size={18} /> Subir
          </button>
        </div>
      </div>

      {/* Lista de Anuncios Subidos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><List size={22} /> Anuncios Activos</h2>
        <div className="space-y-4">
          {anuncios.length > 0 ? (
            anuncios.map((anuncio) => (
              <div key={anuncio.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <img src={import.meta.env.VITE_API_BASE_URL + anuncio.image_url} alt={`Anuncio ${anuncio.id}`} className="w-24 h-16 object-cover rounded-md"/>
                  <div>
                    <p className="font-medium text-gray-700">Anuncio #{anuncio.id}</p>
                    <p className="text-xs text-gray-500">Subido: {new Date(anuncio.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(anuncio.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay anuncios para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
}