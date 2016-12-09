import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface IUser {
    id: number;
    userName: string;
    salt: string;
    hash: string;
    registrationDate?: Date;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    userName: { type: sequelize.STRING, allowNull: false, field: 'user_name' },
    salt: { type: sequelize.STRING, allowNull: false },
    hash: { type: sequelize.STRING, allowNull: false },
    registrationDate: { type: sequelize.DATE, allowNull: true, field: 'registration_date', defaultValue: new Date() }
}

export var options: sequelize.DefineOptions<Instance<IUser>> = {
    freezeTableName: true,
    tableName: 'users',
    timestamps: false
}