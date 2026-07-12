import { prisma } from "../../../../shared/database/prisma";

import { Session } from "../../domain/entities/Session";

import { SessionRepository } from "../../domain/repositories/SessionRepository";

export class PrismaSessionRepository implements SessionRepository {
  async create(session: Session): Promise<Session> {
    const created = await prisma.session.create({
      data: {
        id: session.id,

        refreshToken: session.refreshToken,

        userId: session.userId,

        expiresAt: session.expiresAt,

        revoked: session.revoked,
      },
    });

    return new Session(
      created.id,

      created.refreshToken,

      created.userId,

      created.expiresAt,

      created.revoked,

      created.createdAt,
    );
  }

  async findByRefreshToken(refreshToken: string): Promise<Session | null> {
    const session = await prisma.session.findUnique({
      where: {
        refreshToken,
      },
    });

    if (!session) {
      return null;
    }

    return new Session(
      session.id,

      session.refreshToken,

      session.userId,

      session.expiresAt,

      session.revoked,

      session.createdAt,
    );
  }

  async update(session: Session): Promise<Session> {
    const updated = await prisma.session.update({
      where: {
        id: session.id,
      },

      data: {
        refreshToken: session.refreshToken,

        expiresAt: session.expiresAt,

        revoked: session.revoked,
      },
    });

    return new Session(
      updated.id,

      updated.refreshToken,

      updated.userId,

      updated.expiresAt,

      updated.revoked,

      updated.createdAt,
    );
  }

  async revoke(sessionId: string): Promise<void> {
    await prisma.session.update({
      where: {
        id: sessionId,
      },

      data: {
        revoked: true,
      },
    });
  }

  async revokeAll(userId: string): Promise<void> {
    await prisma.session.updateMany({
      where: {
        userId,
      },

      data: {
        revoked: true,
      },
    });
  }
}
