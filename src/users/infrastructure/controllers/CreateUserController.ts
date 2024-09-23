import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { CreateUserDTO } from "../../application/dtos/CreateUserDTO";

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, birthday, email, password } = req.body;

      const createUserDTO: CreateUserDTO = { name, birthday, email, password };

      const createdUser = await this.createUserUseCase.execute(createUserDTO);

      return res.status(201).json({
        id: createdUser.id,
        uuid: createdUser.uuid,
        name: createdUser.name,
        birthday: createdUser.birthday,
        email: createdUser.email.getValue(),
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(400).json({
        message: "An unknown error occurred",
      });
    }
  }
}
