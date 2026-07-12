export class Session {
  constructor(
    public readonly id: string,

    public refreshToken: string,

    public readonly userId: string,

    public expiresAt: Date,

    public revoked: boolean,

    public readonly createdAt: Date,
  ) {}

  revoke(): void {
    this.revoked = true;
  }

  isExpired(): boolean {
    return this.expiresAt.getTime() < Date.now();
  }

  isActive(): boolean {
    return !this.revoked && !this.isExpired();
  }
  static create(

    refreshToken: string,

    userId: string,

    expiresAt: Date

): Session {

    return new Session(

        crypto.randomUUID(),

        refreshToken,

        userId,

        expiresAt,

        false,

        new Date()

    );

}
}
