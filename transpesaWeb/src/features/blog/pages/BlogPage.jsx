// src/features/blog/pages/BlogPage.jsx

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/Hero';
import PostCard from '../components/PostCard';
// CORRECCIÓN: Importamos los datos desde el archivo centralizado
import { posts } from '../data/mockPosts'; 

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <Hero 
        titleKey="heroBlog" 
        imageUrl="/images/image2.jpg" 
        altText="Imagen Hero Blog" 
      />
      
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* El mapeo funciona igual, pero ahora usa los datos importados */}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}