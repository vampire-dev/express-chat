import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {Instance} from '../models/BaseModel';
import {IMessage} from '../models/Message';

class MessageController extends BaseController<IMessage>{
    constructor() {
        super('Message');
        this.includes.push({ model: this.models.Profile, as: 'sender' }, { model: this.models.Profile, as: 'receiver' });
    }

    findMessages(senderId: number, receiverId: number): Promise<Instance<IMessage>[]> {
        return this.model.findAll({
            where: {
                $and: [{ $or: [{ senderId: senderId }, { recipientId: senderId }] },
                    { $or: [{ receiverId: receiverId }, { receiverId: receiverId }] }]
            },
            include: this.includes,
            order: ['id']
        });
    }
}

export default new MessageController();