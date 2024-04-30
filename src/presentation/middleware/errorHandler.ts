import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../utils/AppError";

const sendErrorForDev = (res: Response, err: AppError) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (res: Response, err: AppError) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const handleCastErrorFromDB = (err: AppError) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateErrorFromDB = (err: AppError) => {
  const message = `Duplicate field value ${Object.keys(
    err.keyValue!
  )}: ${Object.values(err.keyValue!)}. Use different value!`;

  return new AppError(message, 400);
};

const handleValidationErrorFromDB = (err: AppError) => {
  const errors = Object.values(err.errors!).map((el) => el?.properties?.message);
  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const handleJWTError = (err: AppError) => {
  const message = err.message;

  return new AppError(message, 400);
};
const handleJWTExpiredError = () => {
  const message = `Your token expired. Please log in again!`;


  return new AppError(message, 401);
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? "error";

  if (process.env.NODE_ENV === "production") {
    let error = { ...err, name: err.name, message: err.message };

    if (error.name === "CastError") {
      error = handleCastErrorFromDB(error);
    }

    if (error.name === "ValidationError") {
      error = handleValidationErrorFromDB(error);
    }

    if (error.name === "JsonWebTokenError") {
      error = handleJWTError(error);
    }

    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError();
    }

    if (error.code === 11000) {
      error = handleDuplicateErrorFromDB(error);
    }

    sendErrorForProd(res, error);
  } else if (process.env.NODE_ENV === "development") {
    sendErrorForDev(res, err);
  }
};
