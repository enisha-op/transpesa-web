// Asume que tienes una forma de obtener el token JWT.
// Puede ser de localStorage, un contexto de autenticación, etc.
const getAuthToken = () => {
    // ¡IMPORTANTE! Reemplaza esto con tu lógica de obtención de token.
    return localStorage.getItem('jwt_token');
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const request = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Error de red o respuesta no JSON' }));
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null; // Para respuestas sin contenido como DELETE
    }

    return response.json();
};

// Obtener TODOS los posts para el panel de admin
export const getAdminPosts = () => {
    return request('/admin/blog/posts');
};

// Obtener un post específico por ID (para editar)
export const getAdminPostById = (postId) => {
    return request(`/admin/blog/posts/${postId}`);
};

// Crear un nuevo post
export const createPost = (postData) => {
    return request('/admin/blog/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
    });
};

// Actualizar un post existente
export const updatePost = (postId, postData) => {
    return request(`/admin/blog/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
    });
};

// Eliminar un post
export const deletePost = (postId) => {
    return request(`/admin/blog/posts/${postId}`, {
        method: 'DELETE',
    });
};

// Cambiar estado de publicación
export const togglePublishStatus = (postId) => {
    return request(`/admin/blog/posts/${postId}/toggle-publish`, {
        method: 'PATCH',
    });
};
