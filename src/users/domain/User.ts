import { v4 as uuidv4 } from "uuid";
import { Email } from "./value-objects/Email";
import { Password } from "./value-objects/Password";
import { Hasher } from "./value-objects/Hasher";

export class User {
  private constructor(
    private readonly _id: number | null,
    private readonly _uuid: string,
    private _name: string,
    private _birthday: Date,
    private _email: Email,
    private _password: Password
  ) {}

  public static create(
    name: string,
    birthday: Date,
    email: Email,
    password: Password
  ): User {
    if (!name || name.trim().length === 0) {
      throw new Error("Name cannot be empty.");
    }
    if (birthday > new Date()) {
      throw new Error("Birthday cannot be in the future.");
    }

    return new User(null, uuidv4(), name, birthday, email, password);
  }

  public static reconstitute(
    id: number,
    uuid: string,
    name: string,
    birthday: Date,
    email: Email,
    password: Password
  ): User {
    return new User(id, uuid, name, birthday, email, password);
  }

  get id(): number | null {
    return this._id;
  }

  get uuid(): string {
    return this._uuid;
  }

  get name(): string {
    return this._name;
  }

  get birthday(): Date {
    return this._birthday;
  }

  get email(): Email {
    return this._email;
  }

  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("Name cannot be empty.");
    }
    this._name = name;
  }

  updateBirthday(birthday: Date): void {
    if (birthday > new Date()) {
      throw new Error("Birthday cannot be in the future.");
    }
    this._birthday = birthday;
  }

  updateEmail(email: Email): void {
    this._email = email;
  }

  updatePassword(password: Password): void {
    this._password = password;
  }

  verifyPassword(plainPassword: string, hasher: Hasher): boolean {
    return this._password.compare(plainPassword, hasher);
  }
}
