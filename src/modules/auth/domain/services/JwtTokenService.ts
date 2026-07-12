import jwt from "jsonwebtoken";

import { TokenService } from "../../domain/services/TokenService";
import { authConfig } from "@/shared/config/auth";
import { TokenPayload } from "../types/TokenPayload";

export class JwtTokenService implements TokenService {
    generateAccessToken(payload: TokenPayload): string {
      return jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {
          expiresIn: "15m",
        }
      );
    }

  generateRefreshToken(userId: string): string {
    return jwt.sign(
      { sub: userId },

      process.env.JWT_REFRESH_SECRET!,

      {
        expiresIn: "7d",
      },
    );
  }

  verify(token: string) {
    return jwt.verify(
      token,

      process.env.JWT_SECRET!,
    );
  }

  getRefreshTokenExpiration(): Date {

    const expiration = new Date();

    expiration.setDate(expiration.getDate() + 7);

    return expiration;

  }
  verifyAccessToken(token: string) {

    return jwt.verify(
        token,
        authConfig.jwtSecret
    );

}

verifyRefreshToken(token: string) {

    return jwt.verify(
        token,
        authConfig.jwtRefreshSecret
    );

}
}
