import { PostgresUserRepository } from "./PostgresUserRepository";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { GetUserByUuidController } from "./controllers/GetUserByUuidController";
import { CreateUserUseCase } from "../application/use-cases/CreateUserUseCase";
import { GetAllUsersUseCase } from "../application/use-cases/GetAllUsersUseCase";
import { GetUserByUuidUseCase } from "../application/use-cases/GetUserByUuidUseCase";
import { BcryptHasher } from "../domain/value-objects/Hasher";
import pool from "../../config/db.config";

const userRepository = new PostgresUserRepository(pool);
const hasher = new BcryptHasher();
const createUserUseCase = new CreateUserUseCase(userRepository, hasher);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByUuidUseCase = new GetUserByUuidUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);
const getUserByUuidController = new GetUserByUuidController(
  getUserByUuidUseCase
);

export { createUserController, getAllUsersController, getUserByUuidController };
