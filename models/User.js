"use strict";
const sequelize = require('sequelize');
exports.attributes = {
    id: { type: sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true },
    userName: { type: sequelize.STRING, allowNull: false, field: 'user_name' },
    salt: { type: sequelize.STRING, allowNull: false },
    hash: { type: sequelize.STRING, allowNull: false },
    registrationDate: { type: sequelize.DATE, allowNull: true, field: 'registration_date', defaultValue: new Date() }
};
exports.options = {
    freezeTableName: true,
    tableName: 'users',
    timestamps: false
};
//# sourceMappingURL=User.js.map