import * as sequelize from 'sequelize';
import * as crypto from 'crypto';
import BaseController from './BaseController';
import {IUser} from '../models/User';
const uuid = require('uuid/v1');

class UserController extends BaseController<IUser>{
    constructor() {
        super('User');
    }

    register(data: any): Promise<boolean> {
        if (data.password) {
            data.salt = crypto.randomBytes(16).toString('base64');
            data.hash = crypto.createHmac('sha256', data.salt).update(data.password).digest('hex');
        }

        return this.sequelize.transaction((t) => {
            return this.model.insertOrUpdate(data, { validate: true, transaction: t }).then(res => {
                return this.models.User.findOne({ where: { userName: data.userName }, transaction: t }).then(res => {
                    var user = res.toJSON();
                    var profileData = {
                        "id": null,
                        "name": data.name,
                        "profilePath": '/postbox/profiles/' + user.userName + '/' + user.userName + '.jpg',
                        "galleryPath": '/postbox/galleries/' + user.userName + '/' + user.userName + '.jpg',
                        "userId": user.id,
                        "room": uuid.v1()
                    };
                    return this.models.Profile.insertOrUpdate(profileData, { validate: true, transaction: t });
                });
            });
        });
    }

    authenticate(userName: string, password: string): Promise<IUser> {
        return this.model.findOne({ where: { userName: userName } }).then(res => {
            if (!res)
                throw new Error('User is not found');

            var user = res.toJSON();
            var currentHash = crypto.createHmac('sha256', user.salt).update(password).digest('hex');

            if (user.hash !== currentHash)
                throw new Error('Password is not found');

            return user;
        });
    }
}

export default new UserController();