// src/features/admin/LoginPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '@/hooks/useApi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Llama al endpoint de login con nuestro hook
      const data = await api.post('/auth/login', { email, password });

      // Si la llamada es exitosa, guarda el token y redirige
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        navigate('/admin'); // Redirige al panel principal del admin
      } else {
        // En caso de que la API no devuelva un token pero la petición sea exitosa
        setError('Respuesta inesperada del servidor.');
      }

    } catch (err) {
      // Si hay un error (ej. 401 Unauthorized), lo mostramos
      setError('Email o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      console.error("Error de login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        <div className="text-center">
            <img src="/logo-transpesa.png" alt="Grupo Transpesa" className="mx-auto h-12 w-auto mb-4" />
            <h2 className="text-2xl font-bold">Panel de Administración</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          {error && (
            <div className="text-center p-2 rounded-md bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}