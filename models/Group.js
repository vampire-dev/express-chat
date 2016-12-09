"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: sequelize.STRING, allowNull: false },
    room: { type: sequelize.STRING, allowNull: false },
    profilePath: { type: sequelize.STRING, allowNull: false, field: 'profile_path' },
    galleryPath: { type: sequelize.STRING, allowNull: false, field: 'gallery_path' }
};
exports.options = {
    freezeTableName: true,
    tableName: 'groups',
    timestamps: false
};
//# sourceMappingURL=Group.js.map