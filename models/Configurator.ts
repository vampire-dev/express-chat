import * as sequelize from 'sequelize';
import * as User from './User';
import * as Profile from './Profile';
import * as Group from './Group';
import * as PrivateRoom from './PrivateRoom';
import * as GroupRoom from './GroupRoom';
import * as Request from './Request';
import * as Notification from './Notification';
import * as Message from './Message';
import {Instance, Model} from './BaseModel';

export interface Models {
    User: Model<User.IUser>;
    Profile: Model<Profile.IProfile>;
    Group: Model<Group.IGroup>;
    PrivateRoom: Model<PrivateRoom.IPrivateRoom>;
    GroupRoom: Model<GroupRoom.IGroupRoom>;
    Request: Model<Request.IRequest>;
    Notification: Model<Notification.INotification>;
    Message: Model<Message.IMessage>;
}

export function create(sequelize: sequelize.Sequelize) {
    var models: Models = {
        User: define(sequelize, User.attributes, User.options, 'User'),
        Profile: define(sequelize, Profile.attributes, Profile.options, 'Profile'),
        Group: define(sequelize, Group.attributes, Group.options, 'Group'),
        PrivateRoom: define(sequelize, PrivateRoom.attributes, PrivateRoom.options, 'PrivateRoom'),
        GroupRoom: define(sequelize, GroupRoom.attributes, GroupRoom.options, 'GroupRoom'),
        Request: define(sequelize, Request.attributes, Request.options, 'Request'),
        Notification: define(sequelize, Notification.attributes, Notification.options, 'Notification'),
        Message: define(sequelize, Message.attributes, Message.options, 'Message'),
    }

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

export function synchronize(models: Models, force: boolean) {
    var keys = Object.keys(models);

    keys.forEach(key => {
        models[key].sync(force);
    });
}

function define<T>(sequelize: sequelize.Sequelize, attributes: sequelize.DefineAttributes,
    options: sequelize.DefineOptions<Instance<T>>, name: string) {
    return sequelize.define<Instance<T>, T>(name, attributes, options);
}