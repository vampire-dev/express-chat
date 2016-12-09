"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    profileId: { type: sequelize.BIGINT, allowNull: false, field: 'profile_id' },
    joinRoomId: { type: sequelize.STRING, allowNull: false, field: 'join_room_id' }
};
exports.options = {
    freezeTableName: true,
    tableName: 'rooms',
    timestamps: false
};
//# sourceMappingURL=Room.js.map