import { WorkspaceMember } from "../entities/WorkspaceMember";

export interface WorkspaceMemberRepository {
  save(member: WorkspaceMember): Promise<void>;

  findById(id: string): Promise<WorkspaceMember | null>;

  findByWorkspaceAndUser(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceMember | null>;

  findAllByWorkspace(workspaceId: string): Promise<WorkspaceMember[]>;

  exists(workspaceId: string, userId: string): Promise<boolean>;
}
