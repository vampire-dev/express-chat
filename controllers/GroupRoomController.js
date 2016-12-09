"use strict";
const BaseController_1 = require('./BaseController');
class GroupRoomController extends BaseController_1.default {
    constructor() {
        super('GroupRoom');
        this.includes.push({ model: this.models.Profile, as: 'profile' }, { model: this.models.Group, as: 'group' });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new GroupRoomController();
//# sourceMappingURL=GroupRoomController.js.map