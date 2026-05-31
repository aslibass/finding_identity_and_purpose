// API_BASE is set via VITE_API_URL in production (Railway env var).
// Falls back to localhost for local development.
export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

// Derive WebSocket URL from HTTP URL so we never have to set it separately.
// https://api.example.com → wss://api.example.com
// http://localhost:8000  → ws://localhost:8000
export const WS_BASE = API_BASE.replace(/^https:/, 'wss:').replace(/^http:/, 'ws:')
