import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface INotification {
    id: number;
    fromId: number;
    text: string;
    date: Date;
    status: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    fromId: { type: sequelize.BIGINT, allowNull: false, field: 'from_id' },
    text: { type: sequelize.STRING, allowNull: false },
    date: { type: sequelize.DATE, allowNull: false },
    status: { type: sequelize.STRING, allowNull: false }
}

export var options: sequelize.DefineOptions<Instance<INotification>> = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false
}