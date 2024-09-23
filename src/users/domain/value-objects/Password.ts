import * as bcrypt from "bcrypt";

export class Password {
  private readonly value: string;

  private constructor(hashedPassword: string) {
    this.value = hashedPassword;
  }

  public static create(plainPassword: string): Password {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
    return new Password(hashedPassword);
  }

  public static reconstitute(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }

  public getValue(): string {
    return this.value;
  }

  public compare(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this.value);
  }
}
