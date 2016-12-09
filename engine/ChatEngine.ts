import * as socketio from 'socket.io';
import * as http from 'http';
import Instance from './Instance';

class ChatEngine {
    instances: any;

    constructor() {
        this.instances = {};
    }

    start(app, port): void {
        var server = http.createServer(app);
        var io = socketio(server);

        server.listen(port, (err) => {
            console.log('Chat engine is running on port %s', port);
        });

        io.on('connection', (socket) => {
            var instance = new Instance(socket);

            instance.socket.on('initialize', (userId: number) => {
                instance.userId = userId;

                if (!this.instances[userId])
                    this.instances[userId] = instance;
                else
                    this.instances[userId] = instance;

                instance.initialize();
            });

            instance.socket.on('search profile', (userName: string) => {
                instance.searchProfile(userName);
            });

            instance.socket.on('request', (confirmerId: number) => {
                var confirmerInstance = this.instances[confirmerId];
                instance.request(confirmerId, confirmerInstance);
            });

            instance.socket.on('confirm', (requesterId: number) => {
                var requesterInstance = this.instances[requesterId];
                instance.confirm(requesterId, requesterInstance);
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

export default new ChatEngine();