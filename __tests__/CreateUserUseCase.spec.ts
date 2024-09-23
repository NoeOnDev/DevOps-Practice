import { CreateUserUseCase } from "../src/users/application/use-cases/CreateUserUseCase";
import { IUserRepository } from "../src/users/domain/IUserRepository";
import { User } from "../src/users/domain/User";
import { Email } from "../src/users/domain/value-objects/Email";
import { CreateUserDTO } from "../src/users/application/dtos/CreateUserDTO";
import { Hasher } from "../src/users/domain/value-objects/Hasher";

class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async getUserByEmail(email: Email): Promise<User | null> {
    return this.users.find((user) => user.email.equals(email)) || null;
  }

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async getUserByUuid(uuid: string): Promise<User | null> {
    return this.users.find((user) => user.uuid === uuid) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

class MockHasher implements Hasher {
  hash(password: string): string {
    return `hashed-${password}`;
  }

  compare(password: string, hash: string): boolean {
    return `hashed-${password}` === hash;
  }
}

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: IUserRepository;
  let hasher: Hasher;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    hasher = new MockHasher();
    createUserUseCase = new CreateUserUseCase(userRepository, hasher);
  });

  it("should create a new user", async () => {
    const createUserDTO: CreateUserDTO = {
      name: "John Doe",
      birthday: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "SecurePassword123",
    };

    const user = await createUserUseCase.execute(createUserDTO);

    expect(user).toBeInstanceOf(User);
    expect(user.email.getValue()).toBe(createUserDTO.email);
  });

  it("should throw an error if email is already in use", async () => {
    const createUserDTO: CreateUserDTO = {
      name: "John Doe",
      birthday: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "SecurePassword123",
    };

    await createUserUseCase.execute(createUserDTO);

    await expect(createUserUseCase.execute(createUserDTO)).rejects.toThrow(
      "Email already in use"
    );
  });
});
