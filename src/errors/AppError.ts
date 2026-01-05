export type AppErrorKind = 'network' | 'timeout' | 'unauthorized' | 'forbidden' | 'not_found' | 'validation' | 'unknown';

export class AppError extends Error {
  kind: AppErrorKind;
  status?: number;
  details?: any;
  constructor(kind: AppErrorKind, message: string, status?: number, details?: any) {
    super(message);
    this.kind = kind;
    this.status = status;
    this.details = details;
  }
}
