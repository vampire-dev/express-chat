"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize.BIGINT, allowNull: false, field: 'user_id' },
    room: { type: sequelize.STRING, allowNull: false },
    name: { type: sequelize.STRING, allowNull: false },
    email: { type: sequelize.STRING, allowNull: false },
    profilePath: { type: sequelize.STRING, allowNull: false, field: 'profile_path' },
    status: { type: sequelize.STRING, allowNull: false }
};
exports.options = {
    freezeTableName: true,
    tableName: 'profiles',
    timestamps: false
};
//# sourceMappingURL=Profile.js.map