var ExpressChat;
(function (ExpressChat) {
    var Models;
    (function (Models) {
        class Message {
            constructor(data) {
                this.id = data ? data.id : null;
                this.senderId = data ? data.senderId : null;
                this.sender = data ? data.sender : null;
                this.receiverId = data ? data.receiverId : null;
                this.receiver = data ? data.receiver : null;
                this.text = data ? data.text : null;
                this.date = data ? data.date : null;
            }
        }
        Models.Message = Message;
    })(Models = ExpressChat.Models || (ExpressChat.Models = {}));
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=Message.js.map