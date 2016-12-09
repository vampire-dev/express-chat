"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' },
    messageId: { type: sequelize.BIGINT, allowNull: false, field: 'message_id' }
};
exports.options = {
    freezeTableName: true,
    tableName: 'notifications',
    timestamps: false
};
//# sourceMappingURL=Notification.js.map