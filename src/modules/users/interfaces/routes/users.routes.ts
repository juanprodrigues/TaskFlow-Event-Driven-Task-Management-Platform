import { Router } from "express";
import { UserFactory } from "../../factories/UserFactory";

const router = Router();

const controller = UserFactory.createController();

router.post("/", controller.create.bind(controller));

router.get("/", controller.list.bind(controller));

router.get("/:id", controller.findById.bind(controller));

router.put("/:id", controller.update.bind(controller));

router.delete("/:id", controller.delete.bind(controller));

export default router;