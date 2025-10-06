// Define la URL base de tu API. Lo ideal es que esto venga de una variable de entorno.
const API_BASE_URL = 'http://127.0.0.1:5000';

/**
 * Función base para realizar llamadas fetch a la API.
 * Maneja la autenticación y el parseo de la respuesta.
 * @param {string} endpoint - El endpoint de la API al que se llamará.
 * @param {object} options - Opciones para la llamada fetch (método, body, etc.).
 * @returns {Promise<any>} - La respuesta JSON de la API.
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwt_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ msg: 'Ocurrió un error desconocido' }));
    throw new Error(errorData.msg || 'La respuesta de la red no fue exitosa');
  }
  
  // Retorna undefined para respuestas sin contenido (ej. DELETE exitoso)
  if (response.status === 204 || response.headers.get('Content-Length') === '0') {
      return;
  }

  return response.json();
};

// --- Funciones exportadas del servicio ---

/**
 * Obtiene todas las postulaciones.
 */
export const getAllApplications = () => {
  return apiFetch('/admin/applications');
};

/**
 * Elimina una postulación por su ID.
 * @param {number} appId - El ID de la postulación a eliminar.
 */
export const deleteApplication = (appId) => {
  return apiFetch(`/admin/applications/${appId}`, { method: 'DELETE' });
};

/**
 * Actualiza el estado de una postulación.
 * @param {number} appId - El ID de la postulación a actualizar.
 * @param {string} newStatus - El nuevo estado para la postulación.
 */
export const updateApplicationStatus = (appId, newStatus) => {
  return apiFetch(`/admin/applications/${appId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: newStatus }),
  });
};

// Exportamos la URL base para poder usarla en los enlaces de descarga/vista previa del componente.
export { API_BASE_URL };
