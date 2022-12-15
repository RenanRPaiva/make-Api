import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../../db"

interface IUser{
    id: number;
    name: string;
    email: string;
    username: string;
    encryptedPassword: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserCreationAttributes = Optional<IUser, 'id'>;

export class User extends Model<IUser, UserCreationAttributes>{
    declare id: number | null;
    declare name: string | null;
    declare email: string | null;
    declare username: string | null;
    declare encryptedPassword: string | null;
    declare role: string | null;
    declare createdAt: Date | null;
    declare updatedAt: Date | null;
};

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(70),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        encryptedPassword: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'                      
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'user'
    }
);