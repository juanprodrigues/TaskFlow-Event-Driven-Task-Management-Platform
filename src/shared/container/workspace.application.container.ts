import { CreateWorkspaceUseCase } from "@/modules/workspace/application/use-cases/CreateWorkspaceUseCase";
import { container } from "tsyringe";

container.registerSingleton(
 "CreateWorkspaceUseCase",
 CreateWorkspaceUseCase
);