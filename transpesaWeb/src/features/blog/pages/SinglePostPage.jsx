import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// --- CORRECCIÓN: Se cambiaron los alias por rutas relativas ---
import Header from '@/components/header';
import Footer from '@/components/footer';
import useApi from '@/hooks/useApi';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Componente para el contenido del post (sin cambios)
const PostBody = ({ content }) => {
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');
  return (
    <div className="prose prose-lg lg:prose-xl max-w-none text-gray-700 leading-relaxed">
      {paragraphs.map((p, index) => {
        if (p.startsWith('### ')) {
          return <h3 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{p.substring(4)}</h3>;
        }
        if (p.startsWith('## ')) {
          return <h2 key={index} className="text-3xl font-bold text-gray-800 mt-10 mb-4">{p.substring(3)}</h2>;
        }
        const boldRegex = /\*\*(.*?)\*\*/g;
        const parts = p.split(boldRegex);
        return (
          <p key={index} className="mb-6">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      })}
    </div>
  );
};

// Componente para la biografía del autor (sin cambios)
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
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useApi();

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const postData = await api.get(`/blog/posts/${slug}`);
        
        if (!postData) {
          setError('Post no encontrado');
        } else {
          setPost(postData);
        }
      } catch (err) {
        setError(err.message || 'Error al cargar el post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
        loadPost();
    }
  }, [slug, api]);

  // Estado de carga
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando post...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Manejo de errores
  if (error || !post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post no encontrado</h1>
            <p className="text-gray-600 mb-8">El artículo que buscas no existe o ha sido eliminado.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center text-red-600 font-semibold hover:text-red-800"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Volver al Blog
            </Link>
          </div>
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
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-red-600 font-semibold">{post.category}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              {post.author} • {format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}
            </p>
          </div>

          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="mt-16 w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl"
          />

          <div className="max-w-3xl mx-auto mt-16">
            <PostBody content={post.content} />
            <AuthorBio 
              author={post.author} 
              authorImage={post.authorImage} 
              authorBio={post.author_bio} 
            />

            <div className="mt-12">
              <Link 
                to="/blog" 
                className="text-red-600 font-semibold inline-flex items-center hover:text-red-800"
              >
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

