import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { BadRequestError } from "../errors";

export const validate =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {

        const result = schema.safeParse(req.body);

        if (!result.success) {

            throw new BadRequestError(
                result.error.issues
                    .map(issue => issue.message)
                    .join(", ")
            );

        }

        req.body = result.data;

        next();

    };