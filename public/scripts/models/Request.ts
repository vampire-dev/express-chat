module ExpressChat.Models {
    export interface IRequest {
        id: number;
        requesterId: number;
        requester?: any;
        confirmerId: number;
        confirmer?: any;
        requestDate: Date;
        approvedDate: Date;
        status: string;
    }

    export class Request {
        id: number;
        requesterId: number;
        requester: any;
        confirmerId: number;
        confirmer: any;
        requestDate: Date;
        approvedDate: Date;
        status: string;

        constructor(data?: IRequest) {
            this.id = data ? data.id : null;
            this.requesterId = data ? data.requesterId : null;
            this.requester = data ? data.requester : null;
            this.confirmerId = data ? data.confirmerId : null;
            this.confirmer = data ? data.confirmer : null;
            this.requestDate = data ? data.requestDate : null;
            this.approvedDate = data ? data.approvedDate : null;
            this.status = data ? data.status : 'pending';
        }
    }
}