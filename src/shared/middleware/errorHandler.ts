import { Request, Response } from "express";
import { AppError } from "../errors";

export function errorHandler(
    error: Error,
    req: Request,
    res: Response): Response {

    if (error instanceof AppError) {

        return res.status(error.statusCode).json({

            success: false,

            message: error.message,

            statusCode: error.statusCode

        });

    }

    console.error(error);

    return res.status(500).json({

        success: false,

        // message: "Internal Server Error",
        message: error,

        statusCode: 500

    });

}