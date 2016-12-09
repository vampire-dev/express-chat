var ExpressChat;
(function (ExpressChat) {
    var Models;
    (function (Models) {
        class PrivateRoom {
            constructor(data) {
                this.id = data ? data.id : null;
                this.profileId = data ? data.profileId : null;
                this.profile = data ? data.profile : null;
                this.room = data ? data.room : null;
            }
        }
        Models.PrivateRoom = PrivateRoom;
    })(Models = ExpressChat.Models || (ExpressChat.Models = {}));
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=PrivateRoom.js.map