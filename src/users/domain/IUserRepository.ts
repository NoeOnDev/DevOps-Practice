import { User } from "./User";
import { Email } from "./value-objects/Email";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(uuid: string): Promise<void>;
  getUserByUuid(uuid: string): Promise<User | null>;
  getUserByEmail(email: Email): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}
