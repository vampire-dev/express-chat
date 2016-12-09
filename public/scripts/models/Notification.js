var ExpressChat;
(function (ExpressChat) {
    var Models;
    (function (Models) {
        class Notification {
            constructor(data) {
                this.id = data ? data.id : null;
                this.profileId = data ? data.profileId : null;
                this.profile = data ? data.profile : null;
                this.fromId = data ? data.fromId : null;
                this.from = data ? data.from : null;
                this.text = data ? data.text : null;
                this.date = data ? data.date : null;
                this.status = data ? data.status : null;
                this.type = data ? data.type : null;
            }
        }
        Models.Notification = Notification;
    })(Models = ExpressChat.Models || (ExpressChat.Models = {}));
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=Notification.js.map