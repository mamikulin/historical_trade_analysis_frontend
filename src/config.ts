// Configuration for different environments
// Behavior:
// - If `VITE_API_BASE_URL` is provided (recommended), use it.
// - If running in a browser on localhost, use the dev proxy path `/api`.
// - Otherwise (packaged/Tauri), fall back to a sensible LAN IP so the app
//   can reach the backend from the native wrapper.
const DEFAULT_LOCAL_IP = '192.168.1.69'; // Replace with your machine IP if different

const inferBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl;

  // In dev (served from localhost), the Vite proxy handles `/api`.
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return '/api';
    }
  }

  // Packaged app (file://) or other hosts: use LAN IP to reach backend.
  return `http://${DEFAULT_LOCAL_IP}:8000/api`;
};

export const API_CONFIG = {
  BASE_URL: inferBaseUrl(),
  IMAGE_SERVER: import.meta.env.VITE_IMAGE_SERVER || `http://${DEFAULT_LOCAL_IP}:9000`,
};

// Log the configuration for debugging
console.log('[Config] API_CONFIG:', API_CONFIG);
console.log('[Config] window.location:', typeof window !== 'undefined' ? window.location.href : 'SSR/Node');

// Example: For local network testing, set in `.env` (preferred):
// VITE_API_BASE_URL=http://192.168.1.100:8000/api
// VITE_IMAGE_SERVER=http://192.168.1.100:9000
