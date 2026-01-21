// Next.js environment variables - use NEXT_PUBLIC_ prefix for client-side access
export const BaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.VITE_API_BASE_URL || '';
// Default to localhost:9000 in development, production gateway URL otherwise
export const BaseGatewayURL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 
  (process.env.NODE_ENV === 'development' ? 'https://saas.dev.gateway.musafirbiz.com' : 'https://saas.dev.gateway.musafirbiz.com');
export const loginBaseURL = process.env.NEXT_PUBLIC_LOGIN_API_URL || process.env.VITE_LOGIN_API_URL || '';
export const APIversion = process.env.NEXT_PUBLIC_API_VERSION || process.env.VITE_API_VERSION || '/api/v1';
export const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || process.env.VITE_SECRET_KEY || '';
export const IPFetchURL = process.env.NEXT_PUBLIC_API_IP_FETCH_URL || process.env.VITE_API_IP_FETCH_URL || '';
