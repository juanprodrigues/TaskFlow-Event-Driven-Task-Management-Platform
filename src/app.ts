import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import routes from "./shared/routes";
import { errorHandler } from "./shared/middleware/errorHandler";

export const app = express();

app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentación de la API"
    },
  },
  apis: ["./src/**/*.ts","./modules/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(routes);

app.use(errorHandler);