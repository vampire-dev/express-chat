import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {INotification} from '../models/Notification';

class NotificationController extends BaseController<INotification>{
    constructor() {
        super('Notification');
        this.includes.push({ model: this.models.Profile, as: 'from' });
    }
}

export default new NotificationController();