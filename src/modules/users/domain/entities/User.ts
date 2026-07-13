import crypto from "crypto";
import { Role } from "../enums/Role";

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: Role,
    public readonly createdAt: Date,
  ) {}

  static create(
    name: string,
    email: string,
    password: string,
    role: Role,
  ): User {
    return new User(
      crypto.randomUUID(),
      name,
      email,
      password,
      role,
      new Date(),
    );
  }

    static restore(data: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    }): User {
    return new User(
        data.id,
        data.name,
        data.email,
        data.password,
        data.role,
        data.createdAt,
    );
    }
}
