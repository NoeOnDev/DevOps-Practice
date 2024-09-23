import { Request, Response } from "express";
import { GetUserByUuidUseCase } from "../../application/use-cases/GetUserByUuidUseCase";

export class GetUserByUuidController {
  private getUserByUuidUseCase: GetUserByUuidUseCase;

  constructor(getUserByUuidUseCase: GetUserByUuidUseCase) {
    this.getUserByUuidUseCase = getUserByUuidUseCase;
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { uuid } = req.params;
      const user = await this.getUserByUuidUseCase.execute(uuid);

      return res.status(200).json({
        id: user?.id,
        uuid: user?.uuid,
        name: user?.name,
        birthday: user?.birthday,
        email: user?.email.getValue(),
      });
    } catch (error) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  }
}
