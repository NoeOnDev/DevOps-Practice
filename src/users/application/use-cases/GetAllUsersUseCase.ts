import { IUserRepository } from "../../domain/IUserRepository";
import { User } from "../../domain/User";

export class GetAllUsersUseCase {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}
