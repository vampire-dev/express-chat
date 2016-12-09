import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface INotification {
    id: number;
    profileId: number;
    messageId: number;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' },
    messageId: { type: sequelize.BIGINT, allowNull: false, field: 'message_id' }
}

export var options: sequelize.DefineOptions<Instance<INotification>> = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false
}