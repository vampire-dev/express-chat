import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {Instance} from '../models/BaseModel';
import {IProfile} from '../models/Profile';

class ProfileController extends BaseController<IProfile>{
    constructor() {
        super('Profile');
        this.includes.push({ model: this.models.User, as: 'user' });
    }

    findByRoom(room: string): Promise<Instance<IProfile>> {
        return this.model.findOne({ where: { room: room }, include: this.includes });
    }
}

export default new ProfileController();