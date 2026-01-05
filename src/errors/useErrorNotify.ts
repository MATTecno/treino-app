import { useCallback } from 'react';
import { AppError } from './AppError';
// você pode plugar em Toast/Alert aqui
export function useErrorNotify() {
  return useCallback((err: unknown) => {
    const e = err as AppError;
    // TODO: conectar com um Toast global
    console.warn('Erro:', e.kind, e.message, e.status, e.details);
  }, []);
}
