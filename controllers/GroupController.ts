import * as sequelize from 'sequelize';
import BaseController from './BaseController';
import {IGroup} from '../models/Group';

class GroupController extends BaseController<IGroup>{
    constructor() {
        super('Group');
    }
}

export default new GroupController();