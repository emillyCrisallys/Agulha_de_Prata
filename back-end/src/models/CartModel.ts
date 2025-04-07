import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ProductModel from "./ProductModel";
import UserModel from "./UserModel";

class CartModel extends Model {
    id: number | undefined;
    userId: number | undefined;
    productId: number | undefined;
    quantity: number | undefined;
}

CartModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        sequelize,
        modelName: "CartModel",
        tableName: "cart"
    }
);

// Relacionamento com UserModel (um usuário pode ter vários itens no carrinho)
CartModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user"
});

export default CartModel;
