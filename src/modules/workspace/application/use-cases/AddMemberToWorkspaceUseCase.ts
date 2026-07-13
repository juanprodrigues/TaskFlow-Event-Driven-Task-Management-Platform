import { inject, injectable } from "tsyringe";

import { WorkspaceRepository } from "../../domain/repositories/WorkspaceRepository";
import { WorkspaceMemberRepository } from "../../domain/repositories/WorkspaceMemberRepository";

import { WorkspaceMember } from "../../domain/entities/WorkspaceMember";

import { EventDispatcher } from "@/shared/domain/events/EventDispatcher";

import { AddWorkspaceMemberDTO } from "../dto/AddWorkspaceMemberDTO";
import { ForbiddenError } from "@/shared/application/error/ForbiddenError";
import { ConflictError } from "@/shared/application/error/ConflictError";
import { NotFoundError } from "@/shared/application/error/NotFoundError";
import { UserRepository } from "@/modules/users/domain/repositories/UserRepository";
import {
  WorkspaceRole,
  WorkspaceRoleType,
} from "../../domain/value-objects/WorkspaceRole";

@injectable()
export class AddMemberToWorkspaceUseCase {
  constructor(
    @inject("workspaceRepository")
    private readonly workspaceRepository: WorkspaceRepository,

    @inject("workspaceMemberRepository")
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,

    @inject("wserRepository")
    private readonly userRepository: UserRepository,

    @inject("EventDispatcher")
    private readonly dispatcher: EventDispatcher,
  ) {}

  async execute(dto: AddWorkspaceMemberDTO): Promise<void> {
    const workspace = await this.workspaceRepository.findById(dto.workspaceId);

    if (!workspace) {
      throw new NotFoundError("Workspace not found");
    }

    const invitedUser = await this.userRepository.findByEmail(dto.email);

    if (!invitedUser) {
      throw new NotFoundError("User not found");
    }

    const requester =
      await this.workspaceMemberRepository.findByWorkspaceAndUser(
        dto.workspaceId,
        dto.requesterId,
      );

    if (!requester) {
      throw new ForbiddenError("You are not a workspace member");
    }

    if (!requester.getProps().role.isAdmin()) {
      throw new ForbiddenError("You don't have permission");
    }

    const exists = await this.workspaceMemberRepository.exists(
      dto.workspaceId,
      invitedUser.id,
    );

    if (exists) {
      throw new ConflictError("User already belongs to this workspace");
    }

    const member = WorkspaceMember.create({
      workspaceId: dto.workspaceId,
      userId: invitedUser.id,
      role: WorkspaceRole.create(WorkspaceRoleType.MEMBER),
    });

    await this.workspaceMemberRepository.save(member);

    // El evento lo agregaremos en el siguiente paso


    await this.dispatcher.dispatchAll(member.pullDomainEvents());
  }
}
