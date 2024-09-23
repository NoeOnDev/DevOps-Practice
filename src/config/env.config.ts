import { config } from "dotenv";

config();

function validateEnvVariables(requiredVars: string[]) {
  requiredVars.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`La variable de entorno ${variable} no está definida`);
    }
  });
}

const requiredEnvVars = [
  "PORT",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_DATABASE",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
];

validateEnvVariables(requiredEnvVars);

const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

export const env = {
  listen: {
    port: PORT,
  },
  db: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
  jwt: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES_IN,
  },
};
