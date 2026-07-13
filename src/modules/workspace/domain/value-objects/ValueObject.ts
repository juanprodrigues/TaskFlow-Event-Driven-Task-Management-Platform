export abstract class ValueObject<T> {

  protected constructor(
    protected readonly value: T,
  ) {}

  public equals(other?: ValueObject<T>): boolean {

    if (!other) {
      return false;
    }

    return JSON.stringify(this.value) ===
           JSON.stringify(other.value);
  }

  public getValue(): T {
    return this.value;
  }
}