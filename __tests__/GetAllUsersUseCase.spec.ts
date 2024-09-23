import { GetAllUsersUseCase } from "../src/users/application/use-cases/GetAllUsersUseCase";
import { IUserRepository } from "../src/users/domain/IUserRepository";
import { User } from "../src/users/domain/User";
import { Email } from "../src/users/domain/value-objects/Email";
import { Password } from "../src/users/domain/value-objects/Password";
import { BcryptHasher } from "../src/users/domain/value-objects/Hasher";

class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async getUserByUuid(uuid: string): Promise<User | null> {
    return this.users.find((user) => user.uuid === uuid) || null;
  }

  async getUserByEmail(email: Email): Promise<User | null> {
    return this.users.find((user) => user.email.equals(email)) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

describe("GetAllUsersUseCase", () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
  });

  it("should return all users", async () => {
    const user1 = User.create(
      "John Doe",
      new Date("1990-01-01"),
      Email.create("john.doe@example.com"),
      Password.create("hashed-password1", new BcryptHasher())
    );
    const user2 = User.create(
      "Jane Doe",
      new Date("1992-02-02"),
      Email.create("jane.doe@example.com"),
      Password.create("hashed-password2", new BcryptHasher())
    );

    await userRepository.createUser(user1);
    await userRepository.createUser(user2);

    const users = await getAllUsersUseCase.execute();

    expect(users).toHaveLength(2);
    expect(users).toContainEqual(user1);
    expect(users).toContainEqual(user2);
  });

  it("should return an empty array if no users exist", async () => {
    const users = await getAllUsersUseCase.execute();

    expect(users).toHaveLength(0);
  });
});
