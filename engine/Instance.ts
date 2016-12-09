import * as Profile from '../models/Profile';
import ProfileController from '../controllers/ProfileController';
import * as PrivateRoom from '../models/PrivateRoom';
import PrivateRoomController from '../controllers/PrivateRoomController';
import * as Request from '../models/Request';
import RequestController from '../controllers/RequestController';
import * as Notification from '../models/Notification';
import NotificationController from '../controllers/NotificationController';

export default class Instance {
    socket: SocketIO.Socket;
    userId: number;
    profile: Profile.IProfile;
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

    searchProfile(userName: string): void {
        ProfileController.findByUserName(userName).then(res => {
            this.socket.emit('get search profile', res.toJSON());
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
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

            NotificationController.save(notification).then(result => {
                if (requesterInstance) {
                    requesterInstance.socket.emit('notify', notification);
                    requesterInstance.setNotifications();
                    requesterInstance.setRooms();
                } 
            });

            this.deleteNotification(notificationId);
            this.setRooms();
        });
    }

    deleteNotification(notificationId: number): void {
        NotificationController.delete(notificationId).then(res => {
            this.setNotifications();
        });
    }
}