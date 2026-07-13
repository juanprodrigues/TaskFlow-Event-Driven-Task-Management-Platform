import { ValueObject } from "@/modules/workspace/domain/value-objects/ValueObject";
import { DomainError } from "@/shared/domain/error/DomainError";

export const ProjectStatuses = {
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

export type ProjectStatusType =
  typeof ProjectStatuses[keyof typeof ProjectStatuses];

export class ProjectStatus extends ValueObject<ProjectStatusType> {
  private constructor(value: ProjectStatusType) {
    super(value);
  }

  static create(value: string): ProjectStatus {
    if (!Object.values(ProjectStatuses).includes(value as ProjectStatusType)) {
      throw new DomainError("Invalid project status");
    }

    return new ProjectStatus(value as ProjectStatusType);
  }

  isActive(): boolean {
    return this.value === ProjectStatuses.ACTIVE;
  }

  isArchived(): boolean {
    return this.value === ProjectStatuses.ARCHIVED;
  }
}