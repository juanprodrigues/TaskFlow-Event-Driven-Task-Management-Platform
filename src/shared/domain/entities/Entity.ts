export abstract class Entity<T> {
  constructor(
    protected readonly props: T,
    protected readonly id: string,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getProps(): T {
    return this.props;
  }

  public equals(other?: Entity<T>): boolean {
    if (!other) {
      return false;
    }

    return this.id === other.id;
  }
}
