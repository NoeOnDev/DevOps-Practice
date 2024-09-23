import { User } from "./User";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(userId: number): Promise<void>;
  getUserById(userId: number): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}
