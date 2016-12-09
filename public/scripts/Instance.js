var ExpressChat;
(function (ExpressChat) {
    class Instance {
        constructor($scope, userId, url, notifier) {
            this.socket = io.connect(url);
            this.socket.emit('initialize', userId);
            this.notifications = [];
            this.socket.on('get profile', (profile) => {
                $scope.$apply(() => {
                    this.profile = new ExpressChat.Models.Profile(profile);
                });
            });
            this.socket.on('get rooms', (rooms) => {
                $scope.$apply(() => {
                    this.rooms = [];
                    rooms.forEach(room => {
                        this.rooms.push(new ExpressChat.Models.PrivateRoom(room));
                    });
                });
            });
            this.socket.on('get notifications', (notifications) => {
                $scope.$apply(() => {
                    this.notifications = [];
                    notifications.forEach(notification => {
                        this.notifications.push(new ExpressChat.Models.Notification(notification));
                    });
                });
            });
            this.socket.on('get messages', (messages) => {
                $scope.$apply(() => {
                    this.messages = [];
                    messages.forEach(message => {
                        this.messages.push(new ExpressChat.Models.Message(message));
                    });
                    this.autoScroll();
                });
            });
            this.socket.on('get search profile', (profile) => {
                $scope.$apply(() => {
                    this.foundProfile = new ExpressChat.Models.Profile(profile);
                });
            });
            this.socket.on('get room', (profile) => {
                $scope.$apply(() => {
                    this.recipient = new ExpressChat.Models.Profile(profile);
                });
            });
            this.socket.on('notify', () => {
                $scope.$apply(() => {
                    notifier.success('You got new notification');
                });
            });
        }
        autoScroll() {
            var chatArea = $('#chat_area');
            chatArea.animate({ scrollTop: chatArea.prop('scrollHeight') }, 300);
        }
    }
    ExpressChat.Instance = Instance;
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=Instance.js.map