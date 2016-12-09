import * as Profile from '../models/Profile';
import ProfileController from '../controllers/ProfileController';
import * as PrivateRoom from '../models/PrivateRoom';
import PrivateRoomController from '../controllers/PrivateRoomController';
import * as Request from '../models/Request';
import RequestController from '../controllers/RequestController';
import * as Notification from '../models/Notification';
import NotificationController from '../controllers/NotificationController';
import * as Message from '../models/Message';
import MessageController from '../controllers/MessageController';

export default class Instance {
    socket: SocketIO.Socket;
    userId: number;
    profile: Profile.IProfile;
    recipient: Profile.IProfile;
    rooms: PrivateRoom.IPrivateRoom[];
    requests: Request.IRequest[];
    pendings: Request.IRequest[];

    constructor(socket) {
        this.socket = socket;
    }

    initialize(): void {
        ProfileController.findByUserId(this.userId).then(res => {
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

    setProfile(): void {
        ProfileController.findByUserId(this.userId).then(res => {
            if (!res) {
                this.socket.emit('log error', 'Profile is not found');
                return;
            }

            this.profile = res.toJSON();
            this.socket.emit('get profile', this.profile);
        });
    }

    setRooms(): void {
        PrivateRoomController.findByRoom(this.profile.room).then(res => {
            this.rooms = res.map(e => e.toJSON());
            this.socket.emit('get rooms', this.rooms);
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
        });
    }

    setRequests(): void {
        RequestController.findRequests(this.profile.id).then(res => {
            this.requests = res.map(e => e.toJSON());
            this.socket.emit('get requests', this.requests);
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
        });
    }

    setNotifications(): void {
        NotificationController.findAll({ "profile": this.profile.id }).then(res => {
            this.socket.emit('get notifications', res.map(e => e.toJSON()));
        });
    }
    
    setMessages(): void {
        MessageController.findMessages(this.profile.id, this.recipient.id).then(res => {
            this.socket.emit('get messages', res.map(e => e.toJSON()));
        });
    }

    clearRoom(): void {
        this.recipient = null;
    }

    searchProfile(userName: string): void {
        ProfileController.findByUserName(userName).then(res => {
            this.socket.emit('get search profile', res.toJSON());
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
        });
    }

    setRoom(profileId: number): void {
        ProfileController.find(profileId).then(res => {
            if (!res) {
                this.socket.emit('log error', 'Profile is not found');
                return;
            }

            this.recipient = res.toJSON();
            this.socket.emit('get room', this.recipient);
            this.setMessages();
        });
    }

    request(confirmerId: number, confirmerInstance: Instance): void {
        var data: Request.IRequest = {
            id: null,
            requesterId: this.profile.id,
            confirmerId: confirmerId,
            requestDate: new Date(),
            approvedDate: null,
            status: 'pending'
        };

        RequestController.request(data).then(res => {
            var notification: Notification.INotification = {
                id: null,
                profileId: confirmerId,
                fromId: this.profile.id,
                date: new Date(),
                text: 'You have a friend request from ' + this.profile.name,
                type: 'request'
            }

            NotificationController.save(notification).then(result => {
                if (confirmerInstance) {
                    confirmerInstance.socket.emit('notify', notification);
                    confirmerInstance.setNotifications();
                }

                this.setRequests();
            }); 
        });
    }

    confirm(requesterId: number, notificationId: number, requesterInstance: Instance): void {
        RequestController.approve(requesterId, this.profile.id).then(res => {
            var notification: Notification.INotification = {
                id: null,
                profileId: requesterId,
                fromId: this.profile.id,
                date: new Date(),
                text: 'Your request has been approved by ' + this.profile.name,
                type: 'confirm'
            }

            this.saveNotification(notification, this);

            if (requesterInstance) {
                requesterInstance.socket.emit('notify', null);
                requesterInstance.setRooms();
            } 

            this.deleteNotification(notificationId);
            this.setRooms();
        });
    }

    sendMessage(text: string, receiverInstance: Instance): void {
        var data: Message.IMessage = {
            id: null,
            date: new Date(),
            senderId: this.profile.id,
            receiverId: this.recipient.id,
            text: text
        }

        var notification: Notification.INotification = {
            id: null,
            profileId: this.recipient.id,
            fromId: this.profile.id,
            date: new Date(),
            text: 'You got new message from ' + this.profile.name,
            type: 'message'
        }

        if (!receiverInstance)
            this.saveNotification(notification, this);

        else if (receiverInstance) {
            if (!receiverInstance.recipient || receiverInstance.recipient.id !== this.profile.id) {
                receiverInstance.saveNotification(notification, receiverInstance);
                receiverInstance.socket.emit('notify', null);
            }
        }

        MessageController.save(data).then(res => {
            this.setMessages();
            receiverInstance.setMessages();
        });
    }

    saveNotification(data: any, instance: Instance): void {
        NotificationController.save(data).then(res => {
            instance.setNotifications();
        });
    }

    deleteNotification(notificationId: number): void {
        NotificationController.delete(notificationId).then(res => {
            this.setNotifications();
        });
    }
}