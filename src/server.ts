import "reflect-metadata";
import "./shared/container";

import { app } from "./app";
import { serverConfig } from "@shared/config";
import { logger } from "@shared/logger/logger";

app.listen(serverConfig.port, () => {
    logger.info(
        `Server running at http://${serverConfig.host}:${serverConfig.port}`
    );
});