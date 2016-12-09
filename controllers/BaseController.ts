import * as sequelize from 'sequelize';
import {Instance, Model} from '../models/BaseModel';
import {Models} from '../models/Configurator';

export default class BaseController<T>{
    sequelize: sequelize.Sequelize;
    models: Models;
    model: Model<T>;
    includes: sequelize.IncludeOptions[];

    constructor(modelName: string) {
        this.sequelize = global['sequelize'];
        this.models = global['models'];
        this.model = this.models[modelName];
        this.includes = [];
    }

    find(id: number): Promise<Instance<T>> {
        return this.model.findById(id);
    }

    findAll(query: any): Promise<Instance<T>[]> {
        var parameter = this.applyQuery(query);
        return this.model.findAll(parameter);
    }

    save(data: any): Promise<boolean> {
        return this.model.insertOrUpdate(data, { validate: true });
    }

    delete(id: number): Promise<number> {
        return this.model.destroy({ where: { id: id } });
    }

    applyQuery(query: any): any {
        throw 'Not implemented';
    }
}