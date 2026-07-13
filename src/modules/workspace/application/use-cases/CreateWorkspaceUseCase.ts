import { inject, injectable } from "tsyringe";

import { WorkspaceRepository } from "../../domain/repositories/WorkspaceRepository";

import { EventDispatcher } from "@/shared/domain/events/EventDispatcher";

import { Workspace } from "../../domain/entities/Workspace";

import { CreateWorkspaceDTO } from "../dto/CreateWorkspaceDTO";

import { CreateWorkspaceResponseDTO } from "../dto/CreateWorkspaceResponseDTO";

import { WorkspaceMapper } from "../mappers/WorkspaceMapper";
//unica responsabilidad Orquestar el caso de negocio.
@injectable()
export class CreateWorkspaceUseCase {
  constructor(
    @inject("workspaceRepository")
    private readonly workspaceRepository: WorkspaceRepository,

    @inject("EventDispatcher")
    private readonly dispatcher: EventDispatcher,
  ) {}

  async execute(data: CreateWorkspaceDTO): Promise<CreateWorkspaceResponseDTO> {
    const workspace = Workspace.create(data);

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
