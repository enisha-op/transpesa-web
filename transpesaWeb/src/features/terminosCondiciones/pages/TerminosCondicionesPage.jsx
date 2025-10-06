// src/features/terminosCondiciones/pages/TerminosCondicionesPage.jsx

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TerminosHeader from '../components/TerminosHeader';
import TerminosContent from '../components/TerminosContent';

export default function TerminosCondicionesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Cabecera específica de la página */}
      <TerminosHeader />

      {/* Contenido principal con los términos */}
      <TerminosContent />

      <Footer />
    </main>
  );
}