import { IUserRepository } from "../../domain/IUserRepository";
import { User } from "../../domain/User";

export class GetUserByUuidUseCase {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(uuid: string): Promise<User | null> {
    const user = await this.userRepository.getUserByUuid(uuid);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
