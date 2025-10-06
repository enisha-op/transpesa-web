import { useState, useEffect } from "react"

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        if (onLoadingComplete) {
          onLoadingComplete()
        }
      }, 500)
    }
  }, [progress, onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-[#E31E24] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-16">
        <div className="relative w-[800px] h-64 max-w-[90vw]">
          {/* Logo base (opaco para mostrar el progreso) */}
          <img
            src="/logo-transpesa-blanco.png"
            alt="Grupo Transpesa"
            className="absolute inset-0 w-full h-full object-contain opacity-20"
          />
          {/* Logo revelado con clip-path */}
          <div
            className="absolute inset-0 overflow-hidden transition-all duration-100"
            style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          >
            <img src="/logo-transpesa-blanco.png" alt="Grupo Transpesa" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Barra de progreso y porcentaje */}
        <div className="flex flex-col items-center gap-4 w-96 max-w-[80vw]">
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white text-2xl font-semibold">{progress}%</div>
        </div>
      </div>
    </div>
  )
}
