import { DomainError } from "../errors/DomainError";

export class WorkspaceName {
  private constructor(
    private readonly value: string,
  ) {}

  static create(name: string): WorkspaceName {
    const normalized = name.trim();

    if (normalized.length < 3) {
      throw new DomainError(
        "Workspace name must contain at least 3 characters.",
      );
    }

    if (normalized.length > 100) {
      throw new DomainError(
        "Workspace name cannot exceed 100 characters.",
      );
    }

    return new WorkspaceName(normalized);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: WorkspaceName): boolean {
    return this.value === other.value;
  }
}