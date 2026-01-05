import { AxiosError } from 'axios';
import { AppError } from './AppError';

export function mapAxiosErrorToAppError(error: AxiosError): AppError {
  if (error.code === 'ECONNABORTED') return new AppError('timeout', 'tempo de requisição excedido');
  if (error.message === 'Network Error') return new AppError('network', 'falha de conexão');

  const status = error.response?.status;
  const data: any = error.response?.data;

  if (status === 401) return new AppError('unauthorized', 'não autorizado', status);
  if (status === 403) return new AppError('forbidden', 'acesso negado', status);
  if (status === 404) return new AppError('not_found', 'recurso não encontrado', status);
  if (status === 422) return new AppError('validation', 'dados inválidos', status, data?.errors);

  return new AppError('unknown', 'erro inesperado', status, data);
}
