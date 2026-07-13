export interface CreateWorkspaceDTO {
  name: string;

  description?: string | null;

  ownerId: string;
}
