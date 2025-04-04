import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./UserModel";
import Vinyl from "./VinylModel";

const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    vinylId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Vinyl,
            key: "id"
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
}, {
    timestamps: true,
});

Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsTo(Vinyl, { foreignKey: "vinylId" });

export default Cart;
