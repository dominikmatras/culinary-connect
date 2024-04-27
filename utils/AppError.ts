export class AppError extends Error {
  statusCode: number;
  status: string;
  path?: string;
  value?: string;
  code?: number;
  keyValue?: object;
  errors?: object;
  isOperational: Boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

}