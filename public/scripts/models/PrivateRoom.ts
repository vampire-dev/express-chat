module ExpressChat.Models {
    export interface IPrivateRoom {
        id: number;
        profileId: number;
        profile: any;
        room: string;
    }

    export class PrivateRoom {
        id: number;
        profileId: number;
        profile: any;
        room: string;

        constructor(data?: IPrivateRoom) {
            this.id = data ? data.id : null;
            this.profileId = data ? data.profileId : null;
            this.profile = data ? data.profile : null;
            this.room = data ? data.room : null;
        }
    }
}