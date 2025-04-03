import sequelize from "../config/dataBase";
import User from "./user";
import Product from "./product";

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizado!");
  } catch (error) {
    console.error("Erro ao sincronizar o banco:", error);
  }
};

export { sequelize, User, Product, syncDatabase };
