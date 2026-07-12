import jwt from "jsonwebtoken";

import { TokenService } from "../../domain/services/TokenService";

export class JwtTokenService implements TokenService {
  generateAccessToken(userId: string): string {
    return jwt.sign(
      { sub: userId },

      process.env.JWT_SECRET!,

      {
        expiresIn: "15m",
      },
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
}
