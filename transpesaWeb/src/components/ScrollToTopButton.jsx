// src/components/ScrollToTopButton.jsx

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Muestra el botón cuando el scroll vertical es mayor a 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Vuelve al tope de la página con un scroll suave
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Agrega un listener para el evento de scroll cuando el componente se monta
    window.addEventListener('scroll', toggleVisibility);

    // Limpia el listener cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          bg-red-600 hover:bg-red-700 text-white 
          rounded-full p-3 shadow-lg transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-label="Volver arriba"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
}