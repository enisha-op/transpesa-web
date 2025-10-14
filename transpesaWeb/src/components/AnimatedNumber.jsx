// src/components/AnimatedNumber.js

import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

function AnimatedNumber({ value }) {
  // 1. ref para detectar cuándo el elemento es visible
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // 'once: true' para que la animación ocurra solo una vez

  useEffect(() => {
    // 2. Si el elemento está a la vista, inicia la animación
    if (isInView) {
      animate(0, value, {
        duration: 2, // Duración de 2 segundos
        ease: "easeOut", // Efecto de desaceleración al final
        onUpdate(latest) {
          // 3. En cada frame de la animación, actualiza el texto del elemento
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toLocaleString();
          }
        },
      });
    }
  }, [isInView, value]); // El efecto se ejecuta cuando isInView o value cambian

  // El valor inicial es 0, la animación lo actualizará
  return <span ref={ref}>0</span>;
}

export default AnimatedNumber;