import { UnauthorizedError } from "@/shared/errors";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Missing authorization header");
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new UnauthorizedError("Invalid authorization header");
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as jwt.JwtPayload;

    req.user = {
      id: payload.sub as string,
    };

    next();
  } catch {
    throw new UnauthorizedError("Invalid token");
  }
}
