import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../../db"

interface IService {
    id: number,
    name: string,
    category: number,
    valor: number,
    createdAt: Date,
    updatedAt: Date
};

export type ServiceCreationAttributes = Optional<IService, 'id'>;

export class Service extends Model<IService, ServiceCreationAttributes>{
    declare id: number;
    declare name: string;
    declare category: number;
    declare valor: number;
    declare createdAt: Date;
    declare updatedAt: Date;
};

Service.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category:{
            type: new DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        valor: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    },
    {
    sequelize,
    tableName: 'services',
    modelName: 'service'
});