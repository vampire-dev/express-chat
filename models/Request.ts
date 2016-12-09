import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface IRequest {
    id: number;
    requesterId: number;
    requester?: any;
    confirmerId: number;
    confirmer?: any;
    requestDate: Date;
    approvedDate: Date;
    status: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    requesterId: { type: sequelize.BIGINT, allowNull: false, field: 'requester_id' },
    confirmerId: { type: sequelize.BIGINT, allowNull: false, field: 'confirmer_id' },
    requestDate: { type: sequelize.DATE, allowNull: false, field: 'request_date' },
    approvedDate: { type: sequelize.DATE, allowNull: true, field: 'approved_date' },
    status: { type: sequelize.STRING, allowNull: false },
}

export var options: sequelize.DefineOptions<Instance<IRequest>> = {
    freezeTableName: true,
    tableName: 'requests',
    timestamps: false
}