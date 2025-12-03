// Configuration for different environments
// Behavior:
// - If `VITE_API_BASE_URL` is provided (recommended), use it.
// - In development mode (npm run dev), use the dev proxy path `/api`.
// - Otherwise (production/Tauri), use direct IP address.
const DEFAULT_LOCAL_IP = '192.168.1.69'; // Replace with your machine IP if different

const inferBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl;

  // In dev mode, the Vite proxy handles `/api`.
  // import.meta.env.DEV is true only during `npm run dev`
  if (import.meta.env.DEV) {
    return '/api';
  }

  // Production build or Tauri: use direct IP to reach backend.
  return `http://${DEFAULT_LOCAL_IP}:8000/api`;
};

export const API_CONFIG = {
  BASE_URL: inferBaseUrl(),
  IMAGE_SERVER: import.meta.env.VITE_IMAGE_SERVER || `http://${DEFAULT_LOCAL_IP}:9000`,
};

// Log the configuration for debugging
console.log('[Config] Environment variables:');
console.log('[Config]   VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('[Config]   VITE_IMAGE_SERVER:', import.meta.env.VITE_IMAGE_SERVER);
console.log('[Config]   DEV mode:', import.meta.env.DEV);
console.log('[Config] Resolved API_CONFIG:', API_CONFIG);
console.log('[Config] window.location:', typeof window !== 'undefined' ? window.location.href : 'SSR/Node');

// Example: For local network testing, set in `.env` (preferred):
// VITE_API_BASE_URL=http://192.168.1.100:8000/api
// VITE_IMAGE_SERVER=http://192.168.1.100:9000
