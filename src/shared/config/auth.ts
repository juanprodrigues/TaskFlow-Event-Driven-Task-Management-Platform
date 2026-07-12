export const authConfig = {
    jwtSecret: process.env.JWT_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessTokenExpiration: "15m",
    refreshTokenExpiration: "7d"
};