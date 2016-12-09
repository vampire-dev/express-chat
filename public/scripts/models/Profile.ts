module ExpressChat.Models {
    export interface IProfile {
        id: number;
        userId: number;
        user: any;
        room: string;
        name: string;
        email: string;
        profilePath: string;
        status: string;
    }

    export class Profile {
        id: number;
        userId: number;
        user: any;
        room: string;
        name: string;
        email: string;
        profilePath: string;
        status: string;

        constructor(data?: IProfile) {
            this.id = data ? data.id : null;
            this.userId = data ? data.userId : null;
            this.user = data ? data.user : null;
            this.room = data ? data.room : null;
            this.name = data ? data.name : null;
            this.email = data ? data.email : null;
            this.profilePath = data ? data.profilePath : null;
            this.status = data ? data.status : 'No status';
        }
    }
}