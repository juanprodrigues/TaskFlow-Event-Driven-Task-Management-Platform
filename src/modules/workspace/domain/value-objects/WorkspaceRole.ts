import { DomainError } from "@/shared/domain/error/DomainError";
import { ValueObject } from "./ValueObject";

export enum WorkspaceRoleType {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export class WorkspaceRole extends ValueObject<WorkspaceRoleType> {
  private constructor(value: WorkspaceRoleType) {
    super(value);
  }

  static create(role: WorkspaceRoleType): WorkspaceRole {
    if (!Object.values(WorkspaceRoleType).includes(role)) {
      throw new DomainError("Invalid workspace role");
    }

    return new WorkspaceRole(role);
  }

  isOwner(): boolean {
    return this.value === WorkspaceRoleType.OWNER;
  }

  isAdmin(): boolean {
    return (
      this.value === WorkspaceRoleType.ADMIN ||
      this.value === WorkspaceRoleType.OWNER
    );
  }
}
