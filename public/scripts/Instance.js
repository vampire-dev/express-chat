var ExpressChat;
(function (ExpressChat) {
    class Instance {
        constructor($scope, userId, url) {
            this.socket = io.connect(url);
            this.socket.emit('initialize', userId);
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
            this.socket.on('get search profile', (profile) => {
                $scope.$apply(() => {
                    this.foundProfile = new ExpressChat.Models.Profile(profile);
                });
            });
        }
    }
    ExpressChat.Instance = Instance;
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=Instance.js.map