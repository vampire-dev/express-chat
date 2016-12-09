import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface IGroupRoom {
    id: number;
    groupId: number;
    group?: any;
    profileId: number;
    profile?: any;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    groupId: { type: sequelize.BIGINT, allowNull: false, field: 'group_id' },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' }
}

export var options: sequelize.DefineOptions<Instance<IGroupRoom>> = {
    freezeTableName: true,
    tableName: 'group_rooms',
    timestamps: false
}