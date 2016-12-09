import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface IProfile {
    id: number;
    userId: number;
    room: string;
    name: string;
    email: string;
    profilePath: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize.BIGINT, allowNull: false, field: 'user_id' },
    room: { type: sequelize.STRING, allowNull: false },
    name: { type: sequelize.STRING, allowNull: false },
    email: { type: sequelize.STRING, allowNull: false },
    profilePath: { type: sequelize.STRING, allowNull: false, field: 'profile_path' }
}

export var options: sequelize.DefineOptions<Instance<IProfile>> = {
    freezeTableName: true,
    tableName: 'profiles',
    timestamps: false
}