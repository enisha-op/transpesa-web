// src/features/terminosCondiciones/components/TerminosHeader.jsx

import React from 'react';

export default function TerminosHeader() {
  return (
    <header className="bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Términos y Condiciones
        </h1>
        <p className="mt-4 text-xl text-red-100">
          Última actualización: 5 de octubre de 2025
        </p>
      </div>
    </header>
  );
}