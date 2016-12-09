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

                this.instance = new Instance($scope, identity.id, chatSocketURL);

                this.instance.socket.on('log error', (error) => {
                    Notification.error(error);
                });
            });
        }

        searchProfile(): void {
            this.instance.socket.emit('search profile', this.userNameQuery);
            this.viewType = 'searchProfile';
        }
    }

    expressChat.controller('IndexCtrl', IndexCtrl);
}