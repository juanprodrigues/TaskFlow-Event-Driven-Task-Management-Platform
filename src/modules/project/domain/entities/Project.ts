import { randomUUID } from "node:crypto";

import { AggregateRoot } from "@/shared/domain/events/AggregateRoot";

import { ProjectStatus, ProjectStatuses } from "../value-objects/ProjectStatus";
import { ProjectCreatedEvent } from "../events/ProjectCreatedEvent";

export interface ProjectProps {
  workspaceId: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export class Project extends AggregateRoot<ProjectProps> {
  constructor(
    props: ProjectProps,
    id: string,
  ) {
    super(props, id);
  }

  static create(params: {
    workspaceId: string;
    name: string;
    description?: string;
  }): Project {
    const project = new Project(
      {
        workspaceId: params.workspaceId,
        name: params.name,
        description: params.description,
        status: ProjectStatus.create(ProjectStatuses.ACTIVE),
        createdAt: new Date(),
      },
      randomUUID(),
    );

    project.addDomainEvent(
      new ProjectCreatedEvent(
        project.getId(),
        project.getProps().workspaceId,
      ),
    );

    return project;
  }

  static restore(data: {
    id: string;
    workspaceId: string;
    name: string;
    description?: string | null;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt?: Date;
  }): Project {
    return new Project(
      {
        workspaceId: data.workspaceId,
        name: data.name,
        description: data.description ?? undefined,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );
  }

  archive(): void {
    this.props.status = ProjectStatus.create(ProjectStatuses.ARCHIVED);
  }
}