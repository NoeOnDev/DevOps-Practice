import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../application/use-cases/GetAllUsersUseCase";

export class GetAllUsersController {
  private getAllUsersUseCase: GetAllUsersUseCase;

  constructor(getAllUsersUseCase: GetAllUsersUseCase) {
    this.getAllUsersUseCase = getAllUsersUseCase;
  }

  public async handle(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.getAllUsersUseCase.execute();
      return res.status(200).json(
        users.map((user) => ({
          id: user.id,
          uuid: user.uuid,
          name: user.name,
          birthday: user.birthday,
          email: user.email.getValue(),
        }))
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving users",
      });
    }
  }
}
