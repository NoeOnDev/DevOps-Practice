import { IUserRepository } from "../../domain/IUserRepository";
import { User } from "../../domain/User";
import { Email } from "../../domain/value-objects/Email";
import { Password } from "../../domain/value-objects/Password";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { Hasher } from "../../domain/value-objects/Hasher";

export class CreateUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly hasher: Hasher;

  constructor(userRepository: IUserRepository, hasher: Hasher) {
    this.userRepository = userRepository;
    this.hasher = hasher;
  }

  public async execute(createUserDTO: CreateUserDTO): Promise<User> {
    const email = Email.create(createUserDTO.email);
    const password = Password.create(createUserDTO.password, this.hasher);

    const user = User.create(
      createUserDTO.name,
      createUserDTO.birthday,
      email,
      password
    );

    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const createdUser = await this.userRepository.createUser(user);
    return createdUser;
  }
}
