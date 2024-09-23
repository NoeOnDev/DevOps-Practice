import { v4 as uuidv4 } from "uuid";
import { Email } from "./value-objects/Email";
import { Password } from "./value-objects/Password";

export class User {
  private constructor(
    private readonly _id: number,
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
    return new User(0, uuidv4(), name, birthday, email, password);
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

  get id(): number {
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
    this._name = name;
  }

  updateBirthday(birthday: Date): void {
    this._birthday = birthday;
  }

  updateEmail(email: Email): void {
    this._email = email;
  }

  updatePassword(password: Password): void {
    this._password = password;
  }

  verifyPassword(plainPassword: string): boolean {
    return this._password.compare(plainPassword);
  }
}
