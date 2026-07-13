import { Router } from "express";
import healthRoutes from "../modules/health/interfaces/routes/health.routes";

import usersRoutes from "../modules/users/interfaces/routes/users.routes";
import authRoutes from "../modules/auth/interfaces/routes/auth.routes";
import workspaceRoutes from "@/modules/workspace/interfaces/routes/workspace.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);
export default router;
