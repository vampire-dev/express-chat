"use strict";
const BaseController_1 = require('./BaseController');
class PrivateRoomController extends BaseController_1.default {
    constructor() {
        super('PrivateRoom');
        this.includes.push({ model: this.models.Profile, as: 'profile' });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new PrivateRoomController();
//# sourceMappingURL=PrivateRoomController.js.map