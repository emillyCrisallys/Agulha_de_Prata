import { Model, DataTypes, BelongsToMany, BelongsTo } from "sequelize";
import sequelize from "../config/database";
import User from "./UserModel";
import Vinyl from "./VinylModel";

export class Order extends Model {
    public id!: number;
    public userId!: number;
    public totalPrice!: number;
    public status!: string;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pendente", // Valor padrão
        },
    },
    {
        sequelize,
        modelName: "Order",
    }
);

// Relacionamentos
Order.belongsTo(User, { foreignKey: "userId", as: "user" }); // Um pedido pertence a um usuário
Order.belongsTo(User, { foreignKey: "userId", as: "user" }); //

export default Order;