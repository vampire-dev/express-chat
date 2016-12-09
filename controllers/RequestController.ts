import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {Instance} from '../models/BaseModel';
import {IRequest} from '../models/Request';
import {IPrivateRoom} from '../models/PrivateRoom';

class RequestController extends BaseController<IRequest>{
    constructor() {
        super('Request');
        this.includes.push({ model: this.models.Profile, as: 'requester' }, { model: this.models.Profile, as: 'confirmer' });
    }

    findRequests(profileId: number): Promise<Instance<IRequest>[]> {
        return this.model.findAll({ where: { confirmerId: profileId } });
    }

    findPendings(profileId: number): Promise<Instance<IRequest>[]> {
        return this.model.findAll({ where: { requesterId: profileId } });
    }

    request(data: IRequest): Promise<boolean> {
        return this.model.insertOrUpdate(data, { validate: true });
    }

    approve(requesterId: number, confirmerId: number): Promise<Instance<IPrivateRoom>[]> {
        return this.sequelize.transaction((t) => {
            return this.model.findOne({ where: { requesterId: requesterId, confirmerId: confirmerId }, transaction: t })
                .then(res => {
                    var request = res.toJSON();
                    request.status = 'approved';
                    request.approvedDate = new Date();

                    return this.model.insertOrUpdate(request, { validate: true, transaction: t }).then(res => {
                        var requesterRoom: IPrivateRoom = { id: null,  profileId: requesterId, room: request.confirmer.room };
                        var confirmerRoom: IPrivateRoom = { id: null, profileId: confirmerId, room: request.requester.room };

                        return this.models.PrivateRoom.bulkCreate([requesterRoom, confirmerRoom], { transaction: t });
                    });
            });
        });
    }
}

export default new RequestController();