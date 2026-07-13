import { WorkspaceRepository } from "@/modules/workspace/domain/repositories/WorkspaceRepository";
import { PrismaWorkspaceRepository } from "@/modules/workspace/infrastructure/repositories/PrismaWorkspaceRepository";
import { container } from "tsyringe";

container.registerSingleton<WorkspaceRepository>(
  "WorkspaceRepository",
  PrismaWorkspaceRepository,
);
