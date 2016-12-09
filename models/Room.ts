import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface IRoom {
    id: number;
    profileId: number;
    room: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' },
    room: { type: sequelize.STRING, allowNull: false }
}

export var options: sequelize.DefineOptions<Instance<IRoom>> = {
    freezeTableName: true,
    tableName: 'rooms',
    timestamps: false
}