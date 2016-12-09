"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    fromId: { type: sequelize.BIGINT, allowNull: false, field: 'from_id' },
    text: { type: sequelize.STRING, allowNull: false },
    date: { type: sequelize.DATE, allowNull: false },
    status: { type: sequelize.STRING, allowNull: false }
};
exports.options = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false
};
//# sourceMappingURL=Notification.js.map