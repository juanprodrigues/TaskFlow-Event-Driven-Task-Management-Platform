import { Router } from "express";
import { AuthFactory } from "../../factories/AuthFactory";

const router = Router();

const controller = AuthFactory.createController();

router.post("/register", controller.register.bind(controller));

router.post("/login", controller.login.bind(controller));

router.post("/refresh", controller.refresh.bind(controller));
export default router;