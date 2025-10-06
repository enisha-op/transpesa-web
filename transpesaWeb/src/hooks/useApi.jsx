// src/hooks/useApi.js

import { useNavigate } from 'react-router-dom';

const useApi = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem('accessToken');
    
    // CORRECCIÓN: Se ajustan las cabeceras dinámicamente.
    // Si el cuerpo es FormData, el navegador pone el Content-Type solo.
    // Si no, lo ponemos nosotros para JSON.
    const headers = {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      // Si el cuerpo NO es FormData, lo convertimos a JSON
      const body = options.body instanceof FormData ? options.body : JSON.stringify(options.body);

      const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers, body });

      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        navigate('/login');
        return Promise.reject(new Error('No autorizado'));
      }
      
      // Si la respuesta no tiene contenido (ej. en un DELETE), no intentes parsear JSON
      if (response.status === 204) {
        return Promise.resolve();
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.msg || 'Algo salió mal');
      }

      return responseData;

    } catch (error) {
        return Promise.reject(error);
    }
  };

  return {
    get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
    // CORRECCIÓN: El método post ahora no necesita stringify aquí, se hace en 'request'
    post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
    put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
  };
};

export default useApi;