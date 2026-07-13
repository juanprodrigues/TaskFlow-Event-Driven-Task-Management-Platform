import { Router } from "express";

import { container } from "tsyringe";

import { WorkspaceController } from "../controllers/WorkspaceController";
import { authMiddleware } from "@/modules/auth/interfaces/middleware/auth.middleware";
import { WorkspaceMemberController } from "../controllers/WorkspaceMemberController";

const router = Router();

const memberController = container.resolve(WorkspaceMemberController);
const controller = container.resolve(WorkspaceController);

router.post("/", authMiddleware, controller.create);
router.get("/:id", authMiddleware, controller.getById);
router.post("/:workspaceId/members",authMiddleware,memberController.addMember);
export default router;
