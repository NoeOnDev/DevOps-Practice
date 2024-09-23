import { Pool } from "pg";
import { env } from "./env.config";

const pool = new Pool({
  host: env.db.host,
  port: Number(env.db.port),
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
});

export default pool;