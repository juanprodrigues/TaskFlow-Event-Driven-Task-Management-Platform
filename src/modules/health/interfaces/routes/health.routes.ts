import { Router } from "express";
import { HealthController } from "../controllers/HealthController";
import { GetHealthUseCase } from "../../application/usecases/GetHealthUseCase";

const router = Router();

const getHealthUseCase = new GetHealthUseCase();
const controller = new HealthController(getHealthUseCase);

router.get("/", controller.handle.bind(controller));

export default router;