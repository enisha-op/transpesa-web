import { useNavigate } from 'react-router-dom';
// 1. Importamos useCallback y useMemo
import { useCallback, useMemo } from 'react';

const useApi = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 2. Memoizamos la función `request` con useCallback.
  // Solo se volverá a crear si `Maps` cambia (lo cual es muy raro).
  const request = useCallback(async (endpoint, options = {}) => {
    const token = localStorage.getItem('accessToken');
    
    const headers = {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const body = options.body instanceof FormData ? options.body : JSON.stringify(options.body);

      const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers, body });

      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        navigate('/login');
        return Promise.reject(new Error('No autorizado'));
      }
      
      if (response.status === 204) {
        return Promise.resolve();
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.msg || responseData.error || 'Algo salió mal');
      }

      return responseData;

    } catch (error) {
        return Promise.reject(error);
    }
  }, [navigate]); // La dependencia es navigate

  // 3. Memoizamos el objeto de retorno con useMemo.
  // Este objeto ahora será estable y no cambiará en cada renderizado,
  // rompiendo así el bucle infinito.
  return useMemo(() => ({
    get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
    post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
    put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
    patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
  }), [request]);
};

export default useApi;

