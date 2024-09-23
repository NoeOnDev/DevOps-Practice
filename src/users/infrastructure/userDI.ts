import { PostgresUserRepository } from "./PostgresUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "../application/use-cases/CreateUserUseCase";
import { BcryptHasher } from "../domain/value-objects/Hasher";
import pool from "../../config/db.config";

const userRepository = new PostgresUserRepository(pool);
const hasher = new BcryptHasher();
const createUserUseCase = new CreateUserUseCase(userRepository, hasher);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
