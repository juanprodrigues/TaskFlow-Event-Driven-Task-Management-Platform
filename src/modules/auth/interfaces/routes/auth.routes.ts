import { Router } from "express";
// import { AuthFactory } from "../../factories/AuthFactory";
import { authMiddleware } from "../middleware/auth.middleware";
import { container } from "tsyringe";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const controller = container.resolve(AuthController);

router.post("/register", controller.register.bind(controller));

router.post("/login", controller.login.bind(controller));

router.post("/refresh", controller.refresh.bind(controller));

router.post("/logout", controller.logout.bind(controller));

router.post("/logout-all", authMiddleware, controller.logoutAll.bind(controller))

export default router;
