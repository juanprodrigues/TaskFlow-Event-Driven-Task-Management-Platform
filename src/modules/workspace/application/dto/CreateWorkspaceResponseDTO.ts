export interface CreateWorkspaceResponseDTO {
  id: string;

  name: string;

  description: string | null;

  ownerId: string;

  createdAt: Date;
}
