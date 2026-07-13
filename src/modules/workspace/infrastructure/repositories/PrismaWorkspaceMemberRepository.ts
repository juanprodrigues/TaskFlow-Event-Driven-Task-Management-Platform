import { inject, injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { WorkspaceMemberRepository } from "../../domain/repositories/WorkspaceMemberRepository";
import { WorkspaceMember } from "../../domain/entities/WorkspaceMember";
import { WorkspaceMemberMapper } from "../../application/mappers/WorkspaceMemberMapper";

@injectable()
export class PrismaWorkspaceMemberRepository implements WorkspaceMemberRepository {
  constructor(
    @inject(PrismaClient)
    private readonly prisma: PrismaClient) {}

  async save(member: WorkspaceMember): Promise<void> {
    const data = WorkspaceMemberMapper.toPersistence(member);

    await this.prisma.workspaceMember.upsert({
      where: {
        id: data.id,
      },

      update: data,

      create: data,
    });
  }

  async findById(id: string): Promise<WorkspaceMember | null> {
    const member = await this.prisma.workspaceMember.findUnique({
      where: {
        id,
      },
    });

    if (!member) {
      return null;
    }

    return WorkspaceMemberMapper.toDomain(member);
  }

  async findByWorkspaceAndUser(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceMember | null> {
    const member = await this.prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId,
        },
      },
    });

    if (!member) {
      return null;
    }

    return WorkspaceMemberMapper.toDomain(member);
  }

  async findAllByWorkspace(workspaceId: string): Promise<WorkspaceMember[]> {
    const members = await this.prisma.workspaceMember.findMany({
      where: {
        workspaceId,
      },
    });

    return members.map(WorkspaceMemberMapper.toDomain);
  }

  async exists(workspaceId: string, userId: string): Promise<boolean> {
    const member = await this.findByWorkspaceAndUser(workspaceId, userId);

    return !!member;
  }
}
