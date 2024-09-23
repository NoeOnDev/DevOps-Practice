import { Hasher } from "./Hasher";

export class Password {
  private readonly value: string;

  private constructor(hashedPassword: string) {
    this.value = hashedPassword;
  }

  public static create(plainPassword: string, hasher: Hasher): Password {
    return new Password(hasher.hash(plainPassword));
  }

  public static reconstitute(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }

  public getValue(): string {
    return this.value;
  }

  public compare(plainPassword: string, hasher: Hasher): boolean {
    return hasher.compare(plainPassword, this.value);
  }
}
