export interface TokenService {

    generateAccessToken(userId: string): string;

    generateRefreshToken(userId: string): string;

    verify(token: string): unknown;

}