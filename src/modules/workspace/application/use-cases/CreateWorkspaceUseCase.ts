import { inject, injectable } from "tsyringe";

import { WorkspaceRepository } from "../../domain/repositories/WorkspaceRepository";

import { EventDispatcher } from "@/shared/domain/events/EventDispatcher";

import { Workspace } from "../../domain/entities/Workspace";

import { CreateWorkspaceDTO } from "../dto/CreateWorkspaceDTO";

import { WorkspaceResponseDTO } from "../dto/WorkspaceResponseDTO";

import { WorkspaceMapper } from "../mappers/WorkspaceMapper";
import { WorkspaceMemberRepository } from "../../domain/repositories/WorkspaceMemberRepository";
import { WorkspaceMember } from "../../domain/entities/WorkspaceMember";
import { WorkspaceRole, WorkspaceRoleType } from "../../domain/value-objects/WorkspaceRole";
//unica responsabilidad Orquestar el caso de negocio.
@injectable()
export class CreateWorkspaceUseCase {
  constructor(
    @inject("workspaceRepository")
    private readonly workspaceRepository: WorkspaceRepository,

    @inject("EventDispatcher")
    private readonly dispatcher: EventDispatcher,

    @inject("workspaceMemberRepository")
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,

  ) {}

  async execute(data: CreateWorkspaceDTO): Promise<WorkspaceResponseDTO> {
    const workspace = Workspace.create(data);

        const ownerMember = WorkspaceMember.create({
          workspaceId: workspace.getId(),
          userId: data.ownerId,
          role: WorkspaceRole.create(WorkspaceRoleType.OWNER),
        });

        await this.workspaceRepository.save(workspace);

        const exists = await this.workspaceRepository.findById(workspace.getId());

        console.log(exists);
        await this.workspaceMemberRepository.save(ownerMember);

    await this.workspaceRepository.save(workspace);


    await this.dispatcher.dispatchAll(workspace.pullDomainEvents());
    // Primero persistimos.
    // Después publicamos.
    // ¿Por qué?
    // Porque no queremos publicar:
    // WorkspaceCreated
    // si la base de datos falló.
    // Ejemplo:
    // PostgreSQL error
    //       ↓
    // No existe Workspace
    //       ↓
    // Pero Kafka recibió evento
    // Sería inconsistente.
    return WorkspaceMapper.toResponse(workspace);
  }
}
