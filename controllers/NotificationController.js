"use strict";
const BaseController_1 = require('./BaseController');
class NotificationController extends BaseController_1.default {
    constructor() {
        super('Notification');
        this.includes.push({ model: this.models.Profile, as: 'from' });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new NotificationController();
//# sourceMappingURL=NotificationController.js.map