import { Session } from "../entities/Session";

export interface SessionRepository {
  create(session: Session): Promise<Session>;

  findByRefreshToken(refreshToken: string): Promise<Session | null>;

  update(session: Session): Promise<Session>;

  revoke(sessionId: string): Promise<void>;

  revokeAll(userId: string): Promise<void>;
}
