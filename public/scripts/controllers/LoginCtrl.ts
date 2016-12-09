module ExpressChat.Models {
    class LoginCtrl {
        formType: string;
        user: any;
        file: any;

        static $inject = ['$scope', '$state', '$location', 'principal', 'fileUpload', 'Notification'];

        constructor(public $scope, public $state, public $location, public principal, public fileUpload, public Notification) {
            this.formType = 'login';
        }

        login(): void {
            var principal = this.principal;
            var scope = this.$scope;
            var state = this.$state;
            var location = this.$location;
            var notification = this.Notification;

            Services.User.Login(this.user).then(response => {
                principal.authenticate(response.data);
                var params = location.search();

                if (params.redir)
                    window.location.href = window.location.protocol + "//" + window.location.host + params.redir;
                else if (scope.returnToState)
                    state.go(scope.returnToState.name, scope.returnToStateParams);
                else
                    state.go('site.main');
            }).catch(exception => {
                notification.error(exception.data);
            });
        }

        register(): void {
            if (!this.user.name) {
                this.Notification.warning('Name is required');
                return;
            }

            if (!this.user.userName) {
                this.Notification.warning('User Name is required');
                return;
            }

            if (!this.user.password) {
                this.Notification.warning('Password is required');
                return;
            }

            if (!this.user.email) {
                this.Notification.warning('Email is required');
                return;
            }

            Services.User.Register(this.user).then(result => {
                this.Notification.success('User has been saved');
                this.formType = 'login';
            }).catch(exception => {
                this.Notification.error(exception.data);
            }).finally(() => {
                var url = service + 'user/initialUpload?type=profile&folder=' + this.user.userName;
                this.fileUpload.uploadFileToUrl(this.file, url);
            })
        }
    }

    expressChat.controller('LoginCtrl', LoginCtrl);
}