import { Router } from "express";
import healthRoutes from "../modules/health/interfaces/routes/health.routes";

const router = Router();

router.use("/health", healthRoutes);

export default router;