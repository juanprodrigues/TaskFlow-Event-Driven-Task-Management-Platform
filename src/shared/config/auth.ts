export const authConfig = {
    jwtSecret: process.env.JWT_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessToken: {
        expiresIn: "30d",
    },
    refreshToken: {
        expiresIn: "35d",
        expirationDays: 15,
    }
};