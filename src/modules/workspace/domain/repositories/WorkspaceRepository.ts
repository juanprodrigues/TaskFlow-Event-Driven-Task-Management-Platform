import { Workspace } from "../entities/Workspace";

export interface WorkspaceRepository {
  save(workspace: Workspace): Promise<void>;

  findById(id: string): Promise<Workspace | null>;

  findByOwnerId(ownerId: string): Promise<Workspace[]>;

  exists(id: string): Promise<boolean>;
}
