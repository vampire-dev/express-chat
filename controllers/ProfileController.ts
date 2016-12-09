import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {Instance} from '../models/BaseModel';
import {IProfile} from '../models/Profile';

class ProfileController extends BaseController<IProfile>{
    constructor() {
        super('Profile');
        this.includes.push({ model: this.models.User, as: 'user' });
    }

    findByUserName(userName: string): Promise<Instance<IProfile>> {
        return this.models.User.findOne({ where: { userName: userName } }).then(res => {
            if (!res) 
                throw new Error('Profile is not found');
  
            var user = res.toJSON();

            return this.findByUserId(user.id);
        });
    }

    findByUserId(userId: number): Promise<Instance<IProfile>> {
        return this.model.findOne({ where: { userId: userId } });
    }

    findByRoom(room: string): Promise<Instance<IProfile>> {
        return this.model.findOne({ where: { room: room }, include: this.includes });
    }
}

export default new ProfileController();