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
        io.on('connection', this.connect);
    }
    connect(socket) {
        var instance = new Instance_1.default(socket);
        instance.socket.on('initialize', (userId) => {
            instance.userId = userId;
            if (!this.instances[userId])
                this.instances[userId] = instance;
            else
                this.instances[userId] = instance;
            instance.initialize();
        });
        instance.socket.on('find profile', (userName) => {
            instance.findProfile(userName);
        });
        instance.socket.on('request', (confirmerId) => {
            var confirmerInstance = this.instances[confirmerId];
            instance.request(confirmerId, confirmerInstance);
        });
        instance.socket.on('confirm', (requesterId) => {
            var requesterInstance = this.instances[requesterId];
            instance.confirm(requesterId, requesterInstance);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new ChatEngine();
//# sourceMappingURL=ChatEngine.js.map