// src/features/blog/components/BlogHeader.jsx

import React from 'react';

export default function BlogHeader() {
  return (
    <header className="bg-red-600 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Nuestro Blog
        </h1>
        <p className="mt-4 text-xl text-red-100 max-w-2xl mx-auto">
          Noticias, tendencias y consejos del sector logístico para impulsar tu negocio.
        </p>
      </div>
    </header>
  );
}