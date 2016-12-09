import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {INotification} from '../models/Notification';

class NotificationController extends BaseController<INotification>{
    constructor() {
        super('Notification');
        this.includes.push({ model: this.models.Profile, as: 'from' });
    }

    applyQuery(query: any): any {
        var where: sequelize.WhereOptions = {};

        if (query['profile'])
            where['profileId'] = query['profile'];

        var options: sequelize.FindOptions = { where: where, include: this.includes };

        if (query['limit'] && query['skip']) {
            options.limit = query['limit'];
            options.offset = query['skip'];
        }

        return options;
    }
}

export default new NotificationController();