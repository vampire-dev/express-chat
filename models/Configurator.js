"use strict";
const User = require('./User');
const Profile = require('./Profile');
const Group = require('./Group');
const PrivateRoom = require('./PrivateRoom');
const GroupRoom = require('./GroupRoom');
const Request = require('./Request');
const Notification = require('./Notification');
const Message = require('./Message');
function create(sequelize) {
    var models = {
        User: define(sequelize, User.attributes, User.options, 'User'),
        Profile: define(sequelize, Profile.attributes, Profile.options, 'Profile'),
        Group: define(sequelize, Group.attributes, Group.options, 'Group'),
        PrivateRoom: define(sequelize, PrivateRoom.attributes, PrivateRoom.options, 'PrivateRoom'),
        GroupRoom: define(sequelize, GroupRoom.attributes, GroupRoom.options, 'GroupRoom'),
        Request: define(sequelize, Request.attributes, Request.options, 'Request'),
        Notification: define(sequelize, Notification.attributes, Notification.options, 'Notification'),
        Message: define(sequelize, Message.attributes, Message.options, 'Message'),
    };
    models.Profile.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    models.PrivateRoom.belongsTo(models.Profile, { as: 'profile', foreignKey: 'profileId' });
    models.GroupRoom.belongsTo(models.Group, { as: 'group', foreignKey: 'group_id' });
    models.GroupRoom.belongsTo(models.Profile, { as: 'profile', foreignKey: 'profile_id' });
    models.Request.belongsTo(models.Profile, { as: 'requester', foreignKey: 'requesterId' });
    models.Request.belongsTo(models.Profile, { as: 'confirmer', foreignKey: 'confirmerId' });
    models.Notification.belongsTo(models.Profile, { as: 'from', foreignKey: 'fromId' });
    models.Message.belongsTo(models.Profile, { as: 'sender', foreignKey: 'senderId' });
    models.Message.belongsTo(models.Profile, { as: 'receiver', foreignKey: 'receiverId' });
    return models;
}
exports.create = create;
function synchronize(models, force) {
    var keys = Object.keys(models);
    keys.forEach(key => {
        models[key].sync(force);
    });
}
exports.synchronize = synchronize;
function define(sequelize, attributes, options, name) {
    return sequelize.define(name, attributes, options);
}
//# sourceMappingURL=Configurator.js.map