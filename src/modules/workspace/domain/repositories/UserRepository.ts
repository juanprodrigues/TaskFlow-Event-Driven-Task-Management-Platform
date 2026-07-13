import { User } from "@/modules/users/domain/entities/User";

export interface UserRepository {
  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;
}
// ¿Por qué no agregamos save()?
// Porque este caso de uso solo necesita leer usuarios.

// No agregamos métodos "por si acaso".

// Eso mantiene la interfaz pequeña.
