"use strict";
class BaseController {
    constructor(modelName) {
        this.sequelize = global['sequelize'];
        this.models = global['models'];
        this.model = this.models[modelName];
    }
    find(id) {
        return this.model.findById(id);
    }
    findAll(query) {
        var parameter = this.applyQuery(query);
        return this.model.findAll(parameter);
    }
    save(data) {
        return this.model.insertOrUpdate(data, { validate: true });
    }
    delete(id) {
        return this.model.destroy({ where: { id: id } });
    }
    applyQuery(query) {
        throw 'Not implemented';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map