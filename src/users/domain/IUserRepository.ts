import { User } from "./User";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(uuid: string): Promise<void>;
  getUserByUuid(uuid: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}
