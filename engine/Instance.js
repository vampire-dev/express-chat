"use strict";
const ProfileController_1 = require('../controllers/ProfileController');
const PrivateRoomController_1 = require('../controllers/PrivateRoomController');
const RequestController_1 = require('../controllers/RequestController');
const NotificationController_1 = require('../controllers/NotificationController');
const MessageController_1 = require('../controllers/MessageController');
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
    setMessages() {
        MessageController_1.default.findMessages(this.profile.id, this.recipient.id).then(res => {
            this.socket.emit('get messages', res.map(e => e.toJSON()));
        });
    }
    clearRoom() {
        this.recipient = null;
    }
    searchProfile(userName) {
        ProfileController_1.default.findByUserName(userName).then(res => {
            this.socket.emit('get search profile', res.toJSON());
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
        });
    }
    setRoom(profileId) {
        ProfileController_1.default.find(profileId).then(res => {
            if (!res) {
                this.socket.emit('log error', 'Profile is not found');
                return;
            }
            this.recipient = res.toJSON();
            this.socket.emit('get room', this.recipient);
            this.setMessages();
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
            var notification = {
                id: null,
                profileId: confirmerId,
                fromId: this.profile.id,
                date: new Date(),
                text: 'You have a friend request from ' + this.profile.name,
                type: 'request'
            };
            NotificationController_1.default.save(notification).then(result => {
                if (confirmerInstance) {
                    confirmerInstance.socket.emit('notify', notification);
                    confirmerInstance.setNotifications();
                }
                this.setRequests();
            });
        });
    }
    confirm(requesterId, notificationId, requesterInstance) {
        RequestController_1.default.approve(requesterId, this.profile.id).then(res => {
            var notification = {
                id: null,
                profileId: requesterId,
                fromId: this.profile.id,
                date: new Date(),
                text: 'Your request has been approved by ' + this.profile.name,
                type: 'confirm'
            };
            this.saveNotification(notification);
            if (requesterInstance) {
                requesterInstance.socket.emit('notify', null);
                requesterInstance.setRooms();
            }
            this.deleteNotification(notificationId);
            this.setRooms();
        });
    }
    sendMessage(text, receiverInstance) {
        var data = {
            id: null,
            date: new Date(),
            senderId: this.profile.id,
            receiverId: this.recipient.id,
            text: text
        };
        var notification = {
            id: null,
            profileId: this.recipient.id,
            fromId: this.profile.id,
            date: new Date(),
            text: 'You got new message from ' + this.profile.name,
            type: 'message'
        };
        if (!receiverInstance)
            receiverInstance.saveNotification(notification);
        else if (receiverInstance) {
            if (!receiverInstance.recipient || receiverInstance.recipient.id !== this.profile.id) {
                receiverInstance.saveNotification(notification);
                receiverInstance.socket.emit('notify', null);
            }
        }
        MessageController_1.default.save(data).then(res => {
            this.setMessages();
            receiverInstance.setMessages();
        });
    }
    saveNotification(data) {
        NotificationController_1.default.save(data).then(res => {
            this.setNotifications();
        });
    }
    deleteNotification(notificationId) {
        NotificationController_1.default.delete(notificationId).then(res => {
            this.setNotifications();
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Instance;
//# sourceMappingURL=Instance.js.map