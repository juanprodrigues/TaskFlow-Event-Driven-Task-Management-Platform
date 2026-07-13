import { inject, injectable } from "tsyringe";

import { PrismaClient } from "@prisma/client";

import { WorkspaceRepository } from "../../domain/repositories/WorkspaceRepository";

import { Workspace } from "../../domain/entities/Workspace";

@injectable()
export class PrismaWorkspaceRepository implements WorkspaceRepository {
  constructor(
    @inject(PrismaClient)
    private readonly prisma: PrismaClient
    ) {}

  async save(workspace: Workspace): Promise<void> {
    await this.prisma.workspace.upsert({
      where: {
        id: workspace.getId(),
      },

      update: {},

      create: {
        id: workspace.getId(),

        name: workspace.getProps().name.getValue(),

        description: workspace.getProps().description,

        ownerId: workspace.getProps().ownerId,

        createdAt: workspace.getProps().createdAt,
      },
    });
  }

  async findById(id: string): Promise<Workspace | null> {
    const data = await this.prisma.workspace.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return null;
    }

    return Workspace.restore(data);
  }
  async findByOwnerId(ownerId: string): Promise<Workspace[]> {
    const workspaces = await this.prisma.workspace.findMany({
      where: {
        ownerId,
      },
    });

    return workspaces.map((workspace) => Workspace.restore(workspace));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.workspace.count({
      where: {
        id,
      },
    });

    return count > 0;
  }
}