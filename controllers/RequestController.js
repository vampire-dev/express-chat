"use strict";
const BaseController_1 = require('./BaseController');
class RequestController extends BaseController_1.default {
    constructor() {
        super('Request');
        this.includes.push({ model: this.models.Profile, as: 'requester' }, { model: this.models.Profile, as: 'confirmer' });
    }
    findRequests(profileId) {
        return this.model.findAll({ where: { confirmerId: profileId } });
    }
    findPendings(profileId) {
        return this.model.findAll({ where: { requesterId: profileId } });
    }
    request(data) {
        return this.model.insertOrUpdate(data, { validate: true });
    }
    approve(requesterId, confirmerId) {
        return this.sequelize.transaction((t) => {
            return this.model.findOne({ where: { requesterId: requesterId, confirmerId: confirmerId }, transaction: t })
                .then(res => {
                var request = res.toJSON();
                request.status = 'approved';
                request.approvedDate = new Date();
                return this.model.insertOrUpdate(request, { validate: true, transaction: t }).then(res => {
                    var requesterRoom = { id: null, profileId: requesterId, room: request.confirmer.room };
                    var confirmerRoom = { id: null, profileId: confirmerId, room: request.requester.room };
                    return this.models.PrivateRoom.bulkCreate([requesterRoom, confirmerRoom], { transaction: t });
                });
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new RequestController();
//# sourceMappingURL=RequestController.js.map