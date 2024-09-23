import { Pool } from "pg";
import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";
import { Email } from "../domain/value-objects/Email";
import { Password } from "../domain/value-objects/Password";

export class PostgresUserRepository implements IUserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async createUser(user: User): Promise<User> {
    const { uuid, name, birthday, email, password } = user;
    const query = `
      INSERT INTO users (uuid, name, birthday, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const values = [
      uuid,
      name,
      birthday,
      email.getValue(),
      password.getValue(),
    ];

    const result = await this.pool.query(query, values);
    const userId = result.rows[0].id;

    return User.reconstitute(userId, uuid, name, birthday, email, password);
  }

  public async updateUser(user: User): Promise<User> {
    const { uuid, name, birthday, email, password } = user;
    const query = `
      UPDATE users
      SET name = $1, birthday = $2, email = $3, password = $4
      WHERE uuid = $5;
    `;
    const values = [
      name,
      birthday,
      email.getValue(),
      password.getValue(),
      uuid,
    ];

    await this.pool.query(query, values);
    return user;
  }

  public async deleteUser(uuid: string): Promise<void> {
    const query = `
      DELETE FROM users WHERE uuid = $1;
    `;
    await this.pool.query(query, [uuid]);
  }

  public async getUserByUuid(uuid: string): Promise<User | null> {
    const query = `
      SELECT id, uuid, name, birthday, email, password
      FROM users
      WHERE uuid = $1;
    `;
    const result = await this.pool.query(query, [uuid]);

    if (result.rowCount === 0) {
      return null;
    }

    const { id, name, birthday, email, password } = result.rows[0];
    return User.reconstitute(
      id,
      uuid,
      name,
      birthday,
      Email.create(email),
      Password.reconstitute(password)
    );
  }

  public async getUserByEmail(email: Email): Promise<User | null> {
    const query = `
      SELECT id, uuid, name, birthday, email, password
      FROM users
      WHERE email = $1;
    `;
    const result = await this.pool.query(query, [email.getValue()]);

    if (result.rowCount === 0) {
      return null;
    }

    const { id, uuid, name, birthday, password } = result.rows[0];
    return User.reconstitute(
      id,
      uuid,
      name,
      birthday,
      Email.create(email.getValue()),
      Password.reconstitute(password)
    );
  }

  public async getAllUsers(): Promise<User[]> {
    const query = `
      SELECT id, uuid, name, birthday, email, password
      FROM users;
    `;
    const result = await this.pool.query(query);

    return result.rows.map((row: any) =>
      User.reconstitute(
        row.id,
        row.uuid,
        row.name,
        row.birthday,
        Email.create(row.email),
        Password.reconstitute(row.password)
      )
    );
  }
}
