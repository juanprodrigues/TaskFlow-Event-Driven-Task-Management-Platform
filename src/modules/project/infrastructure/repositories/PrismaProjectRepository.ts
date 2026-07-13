import { injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";

import { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import { Project } from "../../domain/entities/Project";
import { ProjectMapper } from "../../application/mappers/ProyectMapper";

@injectable()
export class PrismaProjectRepository
  implements ProjectRepository
{
  constructor(
    private readonly prisma: PrismaClient,
  ) {}

  async save(project: Project): Promise<void> {
    const data = ProjectMapper.toPersistence(project);

    await this.prisma.project.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: data,
    });
  }

  async findById(
    id: string,
  ): Promise<Project | null> {
    const project =
      await this.prisma.project.findUnique({
        where: { id },
      });

    if (!project) {
      return null;
    }

    return ProjectMapper.toDomain(project);
  }

  async findByWorkspace(
    workspaceId: string,
  ): Promise<Project[]> {
    const projects =
      await this.prisma.project.findMany({
        where: {
          workspaceId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return projects.map(ProjectMapper.toDomain);
  }

  async findByWorkspaceAndName(
    workspaceId: string,
    name: string,
  ): Promise<Project | null> {
    const project =
      await this.prisma.project.findFirst({
        where: {
          workspaceId,
          name,
        },
      });

    if (!project) {
      return null;
    }

    return ProjectMapper.toDomain(project);
  }
}