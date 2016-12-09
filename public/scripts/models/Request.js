var ExpressChat;
(function (ExpressChat) {
    var Models;
    (function (Models) {
        class Request {
            constructor(data) {
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
        Models.Request = Request;
    })(Models = ExpressChat.Models || (ExpressChat.Models = {}));
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=Request.js.map