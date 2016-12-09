"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    requesterId: { type: sequelize.BIGINT, allowNull: false, field: 'requester_id' },
    confirmerId: { type: sequelize.BIGINT, allowNull: false, field: 'confirmer_id' },
    requestDate: { type: sequelize.DATE, allowNull: false, field: 'request_date' },
    approvedDate: { type: sequelize.DATE, allowNull: true, field: 'approved_date' },
    status: { type: sequelize.STRING, allowNull: false },
};
exports.options = {
    freezeTableName: true,
    tableName: 'requests',
    timestamps: false
};
//# sourceMappingURL=Request.js.map