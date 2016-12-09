import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface INotification {
    id: number;
    profileId: number;
    profile?: any;
    fromId: number;
    from?: any;
    text: string;
    date: Date;
    type: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' },
    fromId: { type: sequelize.BIGINT, allowNull: false, field: 'from_id' },
    text: { type: sequelize.TEXT, allowNull: false },
    date: { type: sequelize.DATE, allowNull: false },
    type: { type: sequelize.STRING, allowNull: false }
}

export var options: sequelize.DefineOptions<Instance<INotification>> = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false
}