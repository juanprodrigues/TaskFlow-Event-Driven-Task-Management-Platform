import { ApplicationError } from "@/shared/application/error/ApplicationError";
import { DomainError } from "@/shared/domain/error/DomainError";
import { Request, Response } from "express";


export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
) {
  if (error instanceof ApplicationError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof DomainError) {
    return res.status(400).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
}
