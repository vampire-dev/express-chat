module ExpressChat.Models {
    export interface IMessage {
        id: number;
        senderId: number;
        sender?: any;
        receiverId: number;
        receiver?: any;
        date: Date;
        text: string;
    }

    export class Message {
        id: number;
        senderId: number;
        sender: any;
        receiverId: number;
        receiver: any;
        date: Date;
        text: string;

        constructor(data?: IMessage) {
            this.id = data ? data.id : null;
            this.senderId = data ? data.senderId : null;
            this.sender = data ? data.sender : null;
            this.receiverId = data ? data.receiverId : null;
            this.receiver = data ? data.receiver : null;
            this.text = data ? data.text : null;
            this.date = data ? data.date : null;
        }
    }
}