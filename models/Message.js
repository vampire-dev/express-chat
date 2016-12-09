"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    senderId: { type: sequelize.BIGINT, allowNull: false, field: 'sender_id' },
    receiverId: { type: sequelize.BIGINT, allowNull: false, field: 'receiver_id' },
    date: { type: sequelize.DATE, allowNull: false },
    text: { type: sequelize.STRING, allowNull: false },
    status: { type: sequelize.STRING, allowNull: false },
};
exports.options = {
    freezeTableName: true,
    tableName: 'messages',
    timestamps: false
};
//# sourceMappingURL=Message.js.map