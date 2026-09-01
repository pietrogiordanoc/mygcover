import "server-only";

// Limitador básico en memoria por IP. En despliegues serverless con múltiples instancias
// esto no es un límite global estricto; sirve como primera barrera mientras se integra
// una verificación real (Cloudflare Turnstile) y/o un store compartido (Redis, Upstash).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const requestLog = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((ts) => now - ts < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}
