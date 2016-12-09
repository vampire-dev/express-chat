"use strict";
const BaseController_1 = require('./BaseController');
class ProfileController extends BaseController_1.default {
    constructor() {
        super('Profile');
        this.includes.push({ model: this.models.User, as: 'user' });
    }
    findByRoom(room) {
        return this.model.findOne({ where: { room: room }, include: this.includes });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new ProfileController();
//# sourceMappingURL=ProfileController.js.map