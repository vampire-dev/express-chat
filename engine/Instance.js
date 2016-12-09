"use strict";
const ProfileController_1 = require('../controllers/ProfileController');
const PrivateRoomController_1 = require('../controllers/PrivateRoomController');
const RequestController_1 = require('../controllers/RequestController');
const NotificationController_1 = require('../controllers/NotificationController');
class Instance {
    constructor(socket) {
        this.socket = socket;
    }
    initialize() {
        ProfileController_1.default.findByUserId(this.userId).then(res => {
            if (!res) {
                this.socket.emit('log error', 'Profile is not found');
                return;
            }
            this.profile = res.toJSON();
            this.socket.emit('get profile', this.profile);
            this.setRooms();
            this.setRequests();
            this.setNotifications();
        });
    }
    setRooms() {
        PrivateRoomController_1.default.findByRoom(this.profile.room).then(res => {
            this.rooms = res.map(e => e.toJSON());
            this.socket.emit('get rooms', this.rooms);
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
        });
    }
    setRequests() {
        RequestController_1.default.findRequests(this.profile.id).then(res => {
            this.requests = res.map(e => e.toJSON());
            this.socket.emit('get requests', this.requests);
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
        });
    }
    setNotifications() {
        NotificationController_1.default.findAll({ "profile": this.profile.id }).then(res => {
            this.socket.emit('get notifications', res.map(e => e.toJSON()));
        });
    }
    searchProfile(userName) {
        ProfileController_1.default.findByUserName(userName).then(res => {
            this.socket.emit('get search profile', res.toJSON());
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
        });
    }
    request(confirmerId, confirmerInstance) {
        var data = {
            id: null,
            requesterId: this.profile.id,
            confirmerId: confirmerId,
            requestDate: new Date(),
            approvedDate: null,
            status: 'pending'
        };
        RequestController_1.default.request(data).then(res => {
            this.setRequests();
            if (confirmerInstance) {
                var notification = {
                    id: null,
                    profileId: confirmerId,
                    fromId: this.profile.id,
                    date: new Date(),
                    status: 'unread',
                    text: 'You have a friend request from ' + this.profile.name,
                    type: 'request'
                };
                NotificationController_1.default.save(notification).then(result => {
                    confirmerInstance.socket.emit('notify', notification);
                    confirmerInstance.setNotifications();
                });
            }
            this.setRequests();
        });
    }
    confirm(requesterId, requesterInstance) {
        RequestController_1.default.approve(requesterId, this.profile.id).then(res => {
            if (requesterInstance)
                requesterInstance.setRooms();
            this.setRooms();
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Instance;
//# sourceMappingURL=Instance.js.map