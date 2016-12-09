import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {IPrivateRoom} from '../models/PrivateRoom';

class PrivateRoomController extends BaseController<IPrivateRoom>{
    constructor() {
        super('PrivateRoom');
        this.includes.push({ model: this.models.Profile, as: 'profile' });
    }
}

export default new PrivateRoomController();