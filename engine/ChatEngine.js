"use strict";
const socketio = require('socket.io');
const http = require('http');
const Instance_1 = require('./Instance');
class ChatEngine {
    constructor() {
        this.instances = {};
    }
    start(app, port) {
        var server = http.createServer(app);
        var io = socketio(server);
        server.listen(port, (err) => {
            console.log('Chat engine is running on port %s', port);
        });
        io.on('connection', (socket) => {
            var instance = new Instance_1.default(socket);
            instance.socket.on('initialize', (userId) => {
                instance.userId = userId;
                if (!this.instances[userId])
                    this.instances[userId] = instance;
                else
                    this.instances[userId] = instance;
                instance.initialize();
            });
            instance.socket.on('set profile', () => {
                instance.setProfile();
            });
            instance.socket.on('search profile', (userName) => {
                instance.searchProfile(userName);
            });
            instance.socket.on('request', (confirmerId) => {
                var confirmerInstance = this.instances[confirmerId];
                instance.request(confirmerId, confirmerInstance);
            });
            instance.socket.on('set room', (recipientId) => {
                instance.setRoom(recipientId);
            });
            instance.socket.on('clear room', () => {
                instance.clearRoom();
            });
            instance.socket.on('confirm', (data) => {
                var requesterId = data.requesterId;
                var notificationId = data.notificationId;
                var requesterInstance = this.instances[requesterId];
                instance.confirm(requesterId, notificationId, requesterInstance);
            });
            instance.socket.on('send message', (data) => {
                var receiverId = data.receiverId;
                var chatMessage = data.chatMessage;
                var receiverInstance = this.instances[receiverId];
                instance.sendMessage(chatMessage, receiverInstance);
            });
            instance.socket.on('delete notification', (notificationId) => {
                instance.deleteNotification(notificationId);
            });
            instance.socket.on('disconnect', () => {
                if (!instance.userId)
                    return;
                this.instances[instance.userId] = null;
                delete this.instances[instance.userId];
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new ChatEngine();
//# sourceMappingURL=ChatEngine.js.map