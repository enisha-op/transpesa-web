import React, { useState, useEffect } from 'react';
// --- CORRECCIÓN: Se ajustaron las rutas relativas ---
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/Hero';
import PostCard from '../components/PostCard';
import useApi from '@/hooks/useApi';

// Componente opcional para el estado de carga
const LoadingState = () => (
  <div className="col-span-full flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// Componente opcional para el estado de error
const ErrorState = ({ message }) => (
  <div className="col-span-full text-center py-20 bg-red-50 rounded-lg">
    <h3 className="text-xl font-semibold text-red-700">Ocurrió un error</h3>
    <p className="text-red-600 mt-2">{message}</p>
  </div>
);

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useApi();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await api.get('/blog/posts');
        setPosts(data);
        console.log(data);
      } catch (err) {
        setError('No se pudieron cargar las publicaciones. Inténtalo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [api]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <Hero 
        titleKey="heroBlog" 
        imageUrl="/Blog.jpg" 
        altText="Imagen Hero Blog" 
      />
      
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

