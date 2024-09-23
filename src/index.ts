import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.config";
import pool from "./config/db.config";

const app = express();
const PORT = env.listen.port;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos",
});

app.use(limiter);

app.get("/", (_req, res) => {
  res.send(`API funcionando en el puerto ${PORT}`);
});

async function connectWithRetry(retries: number, delay: number) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.connect();
      console.log("Conexión a la base de datos exitosa");

      app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
      return;
    } catch (error) {
      console.error(
        `Error al conectar con la base de datos (intento ${
          i + 1
        } de ${retries}):`,
        error
      );
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  console.error(
    "No se pudo conectar a la base de datos después de múltiples intentos. Saliendo..."
  );
  process.exit(1);
}

connectWithRetry(10, 10000);
