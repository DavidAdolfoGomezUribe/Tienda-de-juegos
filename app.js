import { getDB, connect } from "./src/db/config.js";
import { log } from "console";
import express from "express";
import apiRouter from "./src/routers/index.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

// Habilitar CORS
app.use(cors({
  origin: "*", // Cambia esto a la URL de tu frontend en producción
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Rutas de la API
app.use("/api", apiRouter);

app.get("/api", (_req, res) => res.send({ status: "ok" }));

await connect().then(() => {
  app.listen(PORT, () => {
    log(`Api in http://localhost:${PORT}`);
  });
});
