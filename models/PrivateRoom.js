"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' },
    recipientId: { type: sequelize.BIGINT, allowNull: false, field: 'recipient_id' }
};
exports.options = {
    freezeTableName: true,
    tableName: 'private_rooms',
    timestamps: false
};
//# sourceMappingURL=PrivateRoom.js.map