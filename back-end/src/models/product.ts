import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dataBase";

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public imageUrl!: string;
  public audioUrl!: string;
}

Product.init(
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
    description: {
      type: DataTypes.TEXT,
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
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default Product;
