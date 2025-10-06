// src/components/ScrollToTop.jsx
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Cada vez que cambie la ruta, vuelve al inicio
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
