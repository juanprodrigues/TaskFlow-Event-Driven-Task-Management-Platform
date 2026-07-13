import { Project } from "../entities/Project";

export interface ProjectRepository {
  save(project: Project): Promise<void>;

  findById(id: string): Promise<Project | null>;

  findByWorkspace(workspaceId: string): Promise<Project[]>;

  findByWorkspaceAndName(
    workspaceId: string,
    name: string,
  ): Promise<Project | null>;
}