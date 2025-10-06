// src/features/blog/pages/SinglePostPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { posts } from '../data/mockPosts'; // Importa los datos centralizados
import { ArrowLeft } from 'lucide-react';

// Componente para el contenido del post
const PostBody = ({ content }) => {
  // Simple procesador para convertir saltos de línea en párrafos y detectar títulos
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="prose prose-lg lg:prose-xl max-w-none text-gray-700 leading-relaxed">
      {paragraphs.map((p, index) => {
        if (p.startsWith('### ')) {
          return <h3 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{p.substring(4)}</h3>;
        }
        return <p key={index} className="mb-6">{p}</p>;
      })}
    </div>
  );
};

// Componente para la biografía del autor
const AuthorBio = ({ author, authorImage, authorBio }) => (
    <div className="mt-16 pt-8 border-t border-gray-200 flex items-center gap-6 bg-gray-50 p-6 rounded-lg">
        <img src={authorImage} alt={author} className="w-20 h-20 rounded-full object-cover" />
        <div>
            <p className="text-gray-500 text-sm">Escrito por</p>
            <h4 className="text-xl font-bold text-gray-900">{author}</h4>
            <p className="text-gray-600 mt-1">{authorBio}</p>
        </div>
    </div>
);

export default function SinglePostPage() {
  const { slug } = useParams(); // Obtiene el 'slug' de la URL
  const post = posts.find((p) => p.slug === slug);

  // Manejo por si el post no se encuentra
  if (!post) {
    return (
      <>
        <Header />
        <div className="text-center py-40">
          <h1 className="text-4xl font-bold">Post no encontrado</h1>
          <Link to="/blog" className="text-red-600 mt-4 inline-block">Volver al Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24 sm:pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Cabecera del Post */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-red-600 font-semibold">{post.category}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600">{post.author} • {post.date}</p>
          </div>

          {/* Imagen Principal */}
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="mt-16 w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl"
          />

          {/* Contenido del Post */}
          <div className="max-w-3xl mx-auto mt-16">
            <PostBody content={post.content} />
            <AuthorBio author={post.author} authorImage={post.authorImage} authorBio={post.authorBio} />

             <div className="mt-12">
                <Link to="/blog" className="text-red-600 font-semibold inline-flex items-center">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Volver a todos los posts
                </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}