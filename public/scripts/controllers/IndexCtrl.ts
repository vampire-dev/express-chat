module ExpressChat.Models {
    class IndexCtrl {
        instance: Instance;
        viewType: string;
        userNameQuery: string;
        chatMessage: string;
        newStatus: string;
        newDisplayName: string;
        file: any;

        static $inject = ['$scope', '$state', 'principal', 'fileUpload', 'Notification'];

        constructor(public $scope, public $state, public principal, public fileUpload, public Notification) {
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

                this.instance = new Instance($scope, identity.id, chatSocketURL, Notification);

                this.instance.socket.on('log error', (error) => {
                    Notification.error(error);
                });
            });
        }

        searchProfile(): void {
            this.instance.socket.emit('search profile', this.userNameQuery);
            this.viewType = 'searchProfile';
        }

        request(): void {
            this.instance.socket.emit('request', this.instance.foundProfile.id);
            this.instance.foundProfile = null;
        }

        confirm(requesterId: number, notificationId: number): void {
            this.instance.socket.emit('confirm', { "requesterId": requesterId, "notificationId": notificationId });
        }

        deleteNotification(notificationId: number): void {
            this.instance.socket.emit('delete notification', notificationId);
        }

        setRoom(profileId: number): void {
            this.viewType = 'chat';
            this.instance.socket.emit('set room', profileId);
        }

        sendMessage(): void {
            this.instance.socket.emit('send message', { "chatMessage": this.chatMessage, "receiverId": this.instance.recipient.id });
            this.chatMessage = null;

            var chatArea = $('#chat_area');
            chatArea.animate({ scrollTop: chatArea.prop('scrollHeight') }, 300);
        }

        changeType(type: string): void {
            this.viewType = type;
            this.instance.recipient = null;
            this.instance.socket.emit('clear room', null);

            if (type === 'profile') {
                this.newDisplayName = this.instance.profile.name;
                this.newStatus = this.instance.profile.status;
            }
        }

        updateProfile(): void {
            var data = this.instance.profile;
            data.name = this.newDisplayName;
            data.status = this.newStatus;

            Services.User.UpdateProfile(data).then(res => {
                var url = service + 'user/ProfileUpload?type=profile&folder=' + this.$scope.identity.userName;
                this.fileUpload.uploadFileToUrl(this.file, url);
            }).catch(exception => {
                this.Notification.error(exception.message);
            }).finally(() => {
                window.location.href = root;
            });
        }

        logout() {
            Services.User.Logout();
            this.principal.authenticate(null);
            this.instance.socket.emit('disconnect', null);
            this.$state.go('site.login');
        }
    }

    expressChat.controller('IndexCtrl', IndexCtrl);
}