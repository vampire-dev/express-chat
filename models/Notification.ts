import * as sequelize from 'sequelize';
import {Instance} from './BaseModel';

export interface INotification {
   
}

export var attributes: sequelize.DefineAttributes = {
   
}

export var options: sequelize.DefineOptions<Instance<INotification>> = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false
}