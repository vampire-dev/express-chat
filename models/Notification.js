"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' },
    fromId: { type: sequelize.BIGINT, allowNull: false, field: 'from_id' },
    text: { type: sequelize.TEXT, allowNull: false },
    date: { type: sequelize.DATE, allowNull: false },
    status: { type: sequelize.STRING, allowNull: false },
    type: { type: sequelize.STRING, allowNull: false }
};
exports.options = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false
};
//# sourceMappingURL=Notification.js.map