import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./shared/routes";
import { errorHandler } from "./shared/middleware/errorHandler";

export const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(routes);

app.use(errorHandler);