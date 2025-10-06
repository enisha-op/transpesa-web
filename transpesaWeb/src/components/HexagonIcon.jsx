// components/HexagonIcon.js
export default function HexagonIcon({ children }) {
  return (
    // CAMBIO: Aumentada la altura del contenedor (h-28)
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 115 100"
        fill="#dc2626" // Color de relleno (rojo)
      >
        <path
          d="M28.87 0 L86.6 0 L115.47 50 L86.6 100 L28.87 100 L0 50 Z"
          stroke="white"     
          strokeWidth="5"    
        />
      </svg>
      <div className="relative z-10 text-white">
        {children}
      </div>
    </div>
  );
}