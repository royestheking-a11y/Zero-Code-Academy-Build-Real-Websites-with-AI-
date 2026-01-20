import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://zero-code-academy-build-real-websites-with-ai.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add interceptor for auth if needed later
// api.interceptors.request.use((config) => { ... });

export default api;
