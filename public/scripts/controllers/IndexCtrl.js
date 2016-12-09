var ExpressChat;
(function (ExpressChat) {
    var Models;
    (function (Models) {
        class IndexCtrl {
            constructor($scope, $state, principal, fileUpload, Notification) {
                this.$scope = $scope;
                this.$state = $state;
                this.principal = principal;
                this.fileUpload = fileUpload;
                this.viewType = 'room';
                principal.identity().then((identity) => {
                    $scope.identity = identity;
                    this.instance = new ExpressChat.Instance($scope, identity.id, ExpressChat.chatSocketURL, Notification);
                    this.instance.socket.on('log error', (error) => {
                        Notification.error(error);
                    });
                });
            }
            searchProfile() {
                this.instance.socket.emit('search profile', this.userNameQuery);
                this.viewType = 'searchProfile';
            }
            request() {
                this.instance.socket.emit('request', this.instance.foundProfile.id);
                this.instance.foundProfile = null;
            }
            confirm(requesterId, notificationId) {
                this.instance.socket.emit('confirm', { "requesterId": requesterId, "notificationId": notificationId });
            }
            deleteNotification(notificationId) {
                this.instance.socket.emit('delete notification', notificationId);
            }
            logout() {
                ExpressChat.Services.User.Logout();
                this.principal.authenticate(null);
                this.instance.socket.emit('disconnect', null);
                this.$state.go('site.login');
            }
        }
        IndexCtrl.$inject = ['$scope', '$state', 'principal', 'fileUpload', 'Notification'];
        ExpressChat.expressChat.controller('IndexCtrl', IndexCtrl);
    })(Models = ExpressChat.Models || (ExpressChat.Models = {}));
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=IndexCtrl.js.map