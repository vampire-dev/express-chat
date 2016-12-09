"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    groupId: { type: sequelize.BIGINT, allowNull: false, field: 'group_id' },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' }
};
exports.options = {
    freezeTableName: true,
    tableName: 'group_rooms',
    timestamps: false
};
//# sourceMappingURL=GroupRoom.js.map