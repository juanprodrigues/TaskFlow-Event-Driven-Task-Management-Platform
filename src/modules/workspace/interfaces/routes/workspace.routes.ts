import { Router } from "express";

import { container } from "tsyringe";

import { WorkspaceController } from "../controllers/WorkspaceController";
import { authMiddleware } from "@/modules/auth/interfaces/middleware/auth.middleware";

const router = Router();

const controller = container.resolve(WorkspaceController);

router.post("/", authMiddleware, controller.create);
router.get("/:id", authMiddleware, controller.getById);
export default router;
