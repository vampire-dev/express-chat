import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface IProfile {
    id: number;
    userId: number;
    roomId: string;
    name: string;
    profilePath: string;
    galleryPath: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize.BIGINT, allowNull: false, field: 'user_id' },
    roomId: { type: sequelize.STRING, allowNull: false, field: 'room_id' },
    name: { type: sequelize.STRING, allowNull: false },
    profilePath: { type: sequelize.STRING, allowNull: false, field: 'profile_path' },
    galleryPath: { type: sequelize.STRING, allowNull: false, field: 'gallery_path' }
}

export var options: sequelize.DefineOptions<Instance<IProfile>> = {
    freezeTableName: true,
    tableName: 'profiles',
    timestamps: false
}