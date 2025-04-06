import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class UserModel extends Model {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    document: string | undefined;
    password: string | undefined;
 
}


UserModel.init(
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
        document: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, 
        modelName: 'UserModel',
        tableName: 'users',
    }
)

export default UserModel;