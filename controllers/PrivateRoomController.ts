import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {Instance} from '../models/BaseModel';
import {IPrivateRoom} from '../models/PrivateRoom';

class PrivateRoomController extends BaseController<IPrivateRoom>{
    constructor() {
        super('PrivateRoom');
        this.includes.push({ model: this.models.Profile, as: 'profile' });
    }

    findByRoom(room: string): Promise<Instance<IPrivateRoom>[]> {
        return this.model.findAll({ where: { room: room } });
    }
}

export default new PrivateRoomController();