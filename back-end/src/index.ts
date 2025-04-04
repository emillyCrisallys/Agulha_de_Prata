import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { limiter } from "./middleware/rateLimit";
import { errorHandler } from "./middleware/errorHandler";
import sequelize from "./config/database";

// Importação dos modelos (antes das rotas)
import "./models/VinylModel";
import "./models/UserModel";
import "./models/AdimModel";
import "./models/CartModel";

// Importação das rotas
import vinylRoutes from "./routes/vinylRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(limiter);

// Rotas principais
app.use("/api/vinyls", vinylRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware de tratamento de erros (último)
app.use(errorHandler);

// Conectar ao banco de dados e iniciar o servidor
sequelize.sync()
    .then(() => {
        console.log("Banco de dados conectado com sucesso");
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });
