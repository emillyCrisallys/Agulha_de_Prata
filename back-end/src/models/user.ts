import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dataBase";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public isAdmin!: boolean;
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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
