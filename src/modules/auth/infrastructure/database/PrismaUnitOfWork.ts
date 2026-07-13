import { injectable } from "tsyringe";

import { UnitOfWork } from "../../domain/unit-of-work/UnitOfWork";
import { TransactionContext } from "./TransactionContext";

@injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(
        private readonly context: TransactionContext
  ) {}

  async execute<T>(work: () => Promise<T>): Promise<T> {
    return this.context.prisma.$transaction(async () => {
      return work();
    });
  }
}
