export const serverConfig = {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "localhost",
    environment: process.env.NODE_ENV || "development"
};