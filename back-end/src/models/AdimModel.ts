import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./UserModel";

interface AdminAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    userId: number;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, "id"> {}

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public userId!: number;
}

Admin.init(
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Admin",
        timestamps: true,
    }
);

Admin.belongsTo(User, { foreignKey: "userId" });

export default Admin;
