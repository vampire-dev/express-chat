import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {IGroupRoom} from '../models/GroupRoom';

class GroupRoomController extends BaseController<IGroupRoom>{
    constructor() {
        super('GroupRoom');
        this.includes.push({ model: this.models.Profile, as: 'profile' }, { model: this.models.Group, as: 'group' });
    }
}

export default new GroupRoomController();