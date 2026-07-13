import {
  Project as PrismaProject,
  ProjectStatus as PrismaProjectStatus,
} from "@prisma/client";
import { Project } from "../../domain/entities/Project";
import {
  ProjectStatus,
  ProjectStatusType,
} from "../../domain/value-objects/ProjectStatus";

export class ProjectMapper {
  static toDomain(raw: PrismaProject): Project {
    return Project.restore({
      id: raw.id,
      workspaceId: raw.workspaceId,
      name: raw.name,
      description: raw.description ?? undefined,
      status: ProjectStatus.create(raw.status as ProjectStatusType),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(project: Project) {
    const props = project.getProps();

    return {
      id: project.getId(),
      workspaceId: props.workspaceId,
      name: props.name,
      description: props.description,
      status: props.status.getValue() as PrismaProjectStatus,
      createdAt: props.createdAt,
    };
  }
}
