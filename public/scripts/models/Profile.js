var ExpressChat;
(function (ExpressChat) {
    var Models;
    (function (Models) {
        class Profile {
            constructor(data) {
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
        Models.Profile = Profile;
    })(Models = ExpressChat.Models || (ExpressChat.Models = {}));
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=Profile.js.map