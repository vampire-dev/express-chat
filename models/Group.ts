import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface IGroup {
    id: number;
    name: number;
    room: string;
    profilePath: string;
    galleryPath: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: sequelize.STRING, allowNull: false },
    room: { type: sequelize.STRING, allowNull: false },
    profilePath: { type: sequelize.STRING, allowNull: false, field: 'profile_path' },
    galleryPath: { type: sequelize.STRING, allowNull: false, field: 'gallery_path' }
}

export var options: sequelize.DefineOptions<Instance<IGroup>> = {
    freezeTableName: true,
    tableName: 'groups',
    timestamps: false
}