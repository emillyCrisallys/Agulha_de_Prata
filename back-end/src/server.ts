import express from "express";
import dotenv from "dotenv";
import { syncDatabase } from "./models";

dotenv.config();

const app = express();
app.use(express.json());

syncDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
