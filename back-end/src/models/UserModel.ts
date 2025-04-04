import { Model, DataTypes } from "sequelize";
import Order from "./OrderModel"; 
import sequelize from "../config/database";

interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
    }
);

// Relacionamento
User.hasMany(Order, { foreignKey: "userId", as: "orders" }); // Um usuário pode ter muitos pedidos

export default User;