import { TokenPayload } from "../types/TokenPayload";

export interface TokenService {

    generateAccessToken(payload: TokenPayload): string;
    
    generateRefreshToken(userId: string): string;

    verifyAccessToken(token: string): unknown;

    verifyRefreshToken(token: string): unknown;

    getRefreshTokenExpiration(): Date;

}