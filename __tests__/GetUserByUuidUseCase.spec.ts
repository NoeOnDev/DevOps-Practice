import { GetUserByUuidUseCase } from "../src/users/application/use-cases/GetUserByUuidUseCase";
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

describe("GetUserByUuidUseCase", () => {
  let getUserByUuidUseCase: GetUserByUuidUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    getUserByUuidUseCase = new GetUserByUuidUseCase(userRepository);
  });

  it("should return a user by UUID", async () => {
    const user = User.create(
      "John Doe",
      new Date("1990-01-01"),
      Email.create("john.doe@example.com"),
      Password.create("hashed-password", new BcryptHasher())
    );
    await userRepository.createUser(user);

    const foundUser = await getUserByUuidUseCase.execute(user.uuid);

    expect(foundUser).toBeInstanceOf(User);
    expect(foundUser?.uuid).toBe(user.uuid);
  });

  it("should throw an error if user is not found", async () => {
    await expect(
      getUserByUuidUseCase.execute("non-existent-uuid")
    ).rejects.toThrow("User not found");
  });
});
