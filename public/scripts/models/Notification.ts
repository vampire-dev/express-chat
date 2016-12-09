module ExpressChat.Models {
    export interface INotification {
        id: number;
        profileId: number;
        profile?: any;
        fromId: number;
        from?: any;
        text: string;
        date: Date;
        type: string;
    }

    export class Notification {
        id: number;
        profileId: number;
        profile: any;
        fromId: number;
        from: any;
        text: string;
        date: Date;
        type: string;

        constructor(data?: INotification) {
            this.id = data ? data.id : null;
            this.profileId = data ? data.profileId : null;
            this.profile = data ? data.profile : null;
            this.fromId = data ? data.fromId : null;
            this.from = data ? data.from : null;
            this.text = data ? data.text : null;
            this.date = data ? data.date : null;
            this.type = data ? data.type : null;
        }
    }
}