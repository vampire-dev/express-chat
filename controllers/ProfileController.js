"use strict";
const BaseController_1 = require('./BaseController');
class ProfileController extends BaseController_1.default {
    constructor() {
        super('Profile');
        this.includes.push({ model: this.models.User, as: 'user' });
    }
    findByUserName(userName) {
        return this.models.User.findOne({ where: { userName: userName } }).then(res => {
            if (!res)
                throw new Error('Profile is not found');
            var user = res.toJSON();
            return this.findByUserId(user.id);
        });
    }
    findByUserId(userId) {
        return this.model.findOne({ where: { userId: userId } });
    }
    findByRoom(room) {
        return this.model.findOne({ where: { room: room }, include: this.includes });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new ProfileController();
//# sourceMappingURL=ProfileController.js.map