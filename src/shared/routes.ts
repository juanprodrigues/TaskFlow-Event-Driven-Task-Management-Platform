import { Router } from "express";
import healthRoutes from "../modules/health/interfaces/routes/health.routes";
import usersRoutes from "../modules/users/interfaces/routes/users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/health", healthRoutes);

export default router;