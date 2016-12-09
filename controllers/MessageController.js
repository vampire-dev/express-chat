"use strict";
const BaseController_1 = require('./BaseController');
class MessageController extends BaseController_1.default {
    constructor() {
        super('Message');
        this.includes.push({ model: this.models.Profile, as: 'sender' }, { model: this.models.Profile, as: 'receiver' });
    }
    findMessages(senderId, receiverId) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new MessageController();
//# sourceMappingURL=MessageController.js.map