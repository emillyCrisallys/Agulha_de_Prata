import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Order from "./OrderModel";

interface VinylAttributes {
    id?: number;
    title: string;
    artist: string;
    price: number;
    imageUrl: string;
    orderId?: number;
}

class Vinyl extends Model<VinylAttributes> implements VinylAttributes {
    public id!: number;
    public title!: string;
    public artist!: string;
    public price!: number;
    public imageUrl!: string;
    public orderId?: number;
}

Vinyl.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Pode ser nulo se o vinil não estiver associado a um pedido
        },
    },
    
    {
        sequelize,
        modelName: "Vinyl",
    }
);

// Relacionamentos
Vinyl.belongsTo(Order, { foreignKey: "orderId", as: "order" }); 
export default Vinyl;
