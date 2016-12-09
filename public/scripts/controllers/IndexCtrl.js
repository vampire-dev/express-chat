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
                this.Notification = Notification;
                $scope.options = {
                    link: true,
                    linkTarget: '_blank',
                    pdf: { embed: true },
                    image: { embed: true },
                    audio: { embed: true },
                    code: { highlight: true, lineNumbers: false },
                    basicVideo: false,
                    video: {
                        embed: false,
                        width: null,
                        height: null,
                        ytTheme: 'dark',
                        details: false,
                        ytAuthKey: null
                    }
                };
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
            setRoom(profileId) {
                this.viewType = 'chat';
                this.instance.socket.emit('set room', profileId);
            }
            sendMessage() {
                this.instance.socket.emit('send message', { "chatMessage": this.chatMessage, "receiverId": this.instance.recipient.id });
                this.chatMessage = null;
                var chatArea = $('#chat_area');
                chatArea.animate({ scrollTop: chatArea.prop('scrollHeight') }, 300);
            }
            changeType(type) {
                this.viewType = type;
                this.instance.recipient = null;
                this.instance.socket.emit('clear room', null);
                if (type === 'profile') {
                    this.newDisplayName = this.instance.profile.name;
                    this.newStatus = this.instance.profile.status;
                }
            }
            updateProfile() {
                var data = this.instance.profile;
                data.name = this.newDisplayName;
                data.status = this.newStatus;
                ExpressChat.Services.User.UpdateProfile(data).then(res => {
                    var url = ExpressChat.service + 'user/ProfileUpload?type=profile&folder=' + this.$scope.identity.userName;
                    this.fileUpload.uploadFileToUrl(this.file, url);
                }).catch(exception => {
                    this.Notification.error(exception.message);
                }).finally(() => {
                    window.location.href = ExpressChat.root;
                });
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