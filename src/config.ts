// Configuration for different environments
export const API_CONFIG = {
  // For Tauri, use local network IP instead of localhost
  // Replace with your actual IP address
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  IMAGE_SERVER: import.meta.env.VITE_IMAGE_SERVER || '',
};

// Example: For local network testing, set:
// VITE_API_BASE_URL=http://192.168.1.100:8000/api
// VITE_IMAGE_SERVER=http://192.168.1.100:9000
