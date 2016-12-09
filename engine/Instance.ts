import * as Profile from '../models/Profile';
import ProfileController from '../controllers/ProfileController';
import * as PrivateRoom from '../models/PrivateRoom';
import PrivateRoomController from '../controllers/PrivateRoomController';
import * as Request from '../models/Request';
import RequestController from '../controllers/RequestController';

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
            this.setPendings();
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

    setPendings(): void {
        RequestController.findPendings(this.profile.id).then(res => {
            this.requests = res.map(e => e.toJSON());
            this.socket.emit('get pendings', this.requests);
        }).catch(exception => {
            this.socket.emit('log error', exception.message);
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
            this.setRequests();

            if (confirmerInstance)
                confirmerInstance.setPendings();

            this.setRequests();
        });
    }

    confirm(requesterId: number, requesterInstance: Instance): void {
        RequestController.approve(requesterId, this.profile.id).then(res => {
            if (requesterInstance)
                requesterInstance.setRooms();

            this.setRooms();
        });
    }
}