export const authConfig = {
    jwtSecret: process.env.JWT_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessToken: {
        expiresIn: "7d",
    },
    refreshToken: {
        expiresIn: "10d",
        expirationDays: 10,
    }
};