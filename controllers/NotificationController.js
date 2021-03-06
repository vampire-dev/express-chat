"use strict";
const BaseController_1 = require('./BaseController');
class NotificationController extends BaseController_1.default {
    constructor() {
        super('Notification');
        this.includes.push({ model: this.models.Profile, as: 'from' });
    }
    applyQuery(query) {
        var where = {};
        if (query['profile'])
            where['profileId'] = query['profile'];
        var options = { where: where, include: this.includes };
        if (query['limit'] && query['skip']) {
            options.limit = query['limit'];
            options.offset = query['skip'];
        }
        return options;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new NotificationController();
//# sourceMappingURL=NotificationController.js.map