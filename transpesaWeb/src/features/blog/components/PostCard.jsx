// src/features/blog/components/PostCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PostCard({ post }) {
  const { slug, category, title, imageUrl, author, date, excerpt } = post;

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
      <div className="relative overflow-hidden">
        {/* Los enlaces aquí llevarán a la página del post individual en el futuro */}
        <Link to={`/blog/${slug}`}>
          <img 
            src={imageUrl} 
            alt={`Imagen para el post "${title}"`} 
            className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
            <span className="text-gray-500 text-xs">{date}</span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3 leading-tight">
            <Link to={`/blog/${slug}`} className="hover:text-red-600 transition-colors">
              {title}
            </Link>
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            {excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link to={`/blog/${slug}`} className="text-red-600 font-semibold inline-flex items-center group-hover:text-red-800">
            Leer más <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}