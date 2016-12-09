module ExpressChat.Models {
    class IndexCtrl {
        instance: Instance;
        viewType: string;
        userNameQuery: string;

        static $inject = ['$scope', '$state', 'principal', 'fileUpload', 'Notification'];

        constructor(public $scope, public $state, public principal, public fileUpload, Notification) {
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
            this.instance.socket.emit('set recipient', profileId);
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