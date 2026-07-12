import bcrypt from "bcrypt";
import { HashService } from "../../domain/services/HashService";

export class BcryptHashService implements HashService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
