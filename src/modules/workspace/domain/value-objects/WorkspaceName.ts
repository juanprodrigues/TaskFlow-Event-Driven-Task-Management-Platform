import { DomainError } from "../errors/DomainError";
import { ValueObject } from "./ValueObject";

export class WorkspaceName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(name: string): WorkspaceName {
    const normalized = name.trim();

    if (normalized.length < 3) {
      throw new DomainError(
        "Workspace name must contain at least 3 characters",
      );
    }

    if (normalized.length > 100) {
      throw new DomainError("Workspace name cannot exceed 100 characters");
    }

    return new WorkspaceName(normalized);
  }
}
