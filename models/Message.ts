﻿import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface IMessage {
    id: number;
    senderId: number;
    receiverId: number;
    date: Date;
    text: string;
    status: string;
}

export var attributes: sequelize.DefineAttributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    senderId: { type: sequelize.BIGINT, allowNull: false, field: 'sender_id' },
    receiverId: { type: sequelize.BIGINT, allowNull: false, field: 'receiver_id' },
    date: { type: sequelize.DATE, allowNull: false },
    text: { type: sequelize.STRING, allowNull: false },
    status: { type: sequelize.STRING, allowNull: false },
}

export var options: sequelize.DefineOptions<Instance<IMessage>> = {
    freezeTableName: true,
    tableName: 'messages',
    timestamps: false
}