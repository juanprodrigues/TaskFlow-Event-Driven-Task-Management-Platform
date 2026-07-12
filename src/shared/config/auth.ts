export const authConfig = {
    jwtSecret: process.env.JWT_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessToken: {
        expiresIn: "15m",
    },
    refreshToken: {
        expiresIn: "7d",
        expirationDays: 7,
    }
};