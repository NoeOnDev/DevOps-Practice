import * as bcrypt from "bcrypt";

export class BcryptHasher implements Hasher {
  private readonly saltRounds = 10;

  hash(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, this.saltRounds);
  }

  compare(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export interface Hasher {
  hash(plainPassword: string): string;
  compare(plainPassword: string, hashedPassword: string): boolean;
}
