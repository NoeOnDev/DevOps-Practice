import express from "express";
import { env } from "./config/env.config";
import pool from "./config/db.config";

const app = express();
const PORT = env.listen.port;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send(`API funcionando en el puerto ${PORT}`);
});

async function startServer() {
  try {
    await pool.connect();
    console.log("Conexión a la base de datos exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}

startServer();
