// src/components/AnuncioModal.jsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import useApi from "@/hooks/useApi"; // 1. Importa tu hook en lugar del helper 'api'

export default function AnuncioModal() {
  const api = useApi(); // 2. Inicializa el hook
  
  const [anuncio, setAnuncio] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnuncio = sessionStorage.getItem("hasSeenAnuncio");

    if (!hasSeenAnuncio) {
      const fetchActiveAnuncio = async () => {
        try {
          // 3. Usa el hook. Ahora devuelve los datos directamente.
          const data = await api.get("/anuncios/active");
          if (data) {
            setAnuncio(data);
            setIsOpen(true);
            sessionStorage.setItem("hasSeenAnuncio", "true");
          }
        } catch (error) {
          console.log("No hay anuncios activos para mostrar o la API falló.");
        }
      };
      fetchActiveAnuncio();
    }
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez

  if (!isOpen || !anuncio) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative bg-white p-2 rounded-lg shadow-2xl max-w-lg w-full animate-scale-up">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-transform hover:scale-110"
          aria-label="Cerrar anuncio"
        >
          <X size={24} />
        </button>
        {/* 4. Asegúrate de que la URL de la imagen sea completa */}
        <img 
            src={`${import.meta.env.VITE_API_BASE_URL}${anuncio.image_url}`} 
            alt="Anuncio Importante" 
            className="w-full h-auto rounded-md" 
        />
      </div>
    </div>
  );
}

// Opcional: añade estas animaciones a tu CSS principal (ej. src/index.css)
/*
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

@keyframes scale-up {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-scale-up {
  animation: scale-up 0.3s ease-out forwards;
}
*/