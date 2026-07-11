import { Router } from "express";
import { HealthController } from "../controllers/HealthController";

const router = Router();

const controller = new HealthController();

router.get("/", controller.handle);

export default router;