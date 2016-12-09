var ExpressChat;
(function (ExpressChat) {
    ExpressChat.expressChat = angular.module('expressChat', ['ui.router',
        'angular-loading-bar',
        'ui-notification',
        'ngSanitize', 'ngEmoticons']);
    ExpressChat.chatSocketURL = 'http://localhost:6005';
    ExpressChat.root = '/postbox';
    ExpressChat.service = ExpressChat.root + '/ws/';
    var principal = ($q, $http, $timeout) => {
        var _identity = undefined;
        var _authenticated = false;
        return {
            isIdentityResolved: () => {
                return angular.isDefined(_identity);
            },
            isAuthenticated: () => {
                return _authenticated;
            },
            authenticate: (identity) => {
                _identity = identity;
                _authenticated = identity != null;
            },
            identity: (force) => {
                var deferred = $q.defer();
                if (force === true)
                    _identity = undefined;
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);
                    return deferred.promise;
                }
                $http.get(ExpressChat.service + 'user/getIdentity').then((response) => {
                    if (response.data) {
                        _identity = response.data;
                        _authenticated = true;
                    }
                    deferred.resolve(_identity);
                }).catch(() => {
                    _identity = null;
                    _authenticated = false;
                    deferred.resolve(_identity);
                });
                return deferred.promise;
            }
        };
    };
    ExpressChat.expressChat.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
            ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
            $urlRouterProvider.otherwise(ExpressChat.root);
            $locationProvider.html5Mode({ enabled: true });
            $httpProvider.interceptors.push('responseObserver');
            $stateProvider.state('site', {
                abstract: true,
                template: '<ui-view />',
                resolve: {
                    authorize: ['authorization', (authorization) => {
                            return authorization.authorize();
                        }]
                }
            }).state('site.login', {
                url: ExpressChat.root + '/login',
                templateUrl: ExpressChat.root + '/views/login.html',
                controller: 'LoginCtrl as ctrl'
            }).state('site.main', {
                url: ExpressChat.root,
                templateUrl: ExpressChat.root + '/views/main.html',
                controller: 'IndexCtrl as ctrl'
            });
        }]);
    var authorization = ($rootScope, $state, $location, principal) => {
        return {
            authorize: () => {
                return principal.identity().then(function () {
                    var isAuthenticated = principal.isAuthenticated();
                    if (!isAuthenticated && $rootScope.toState.name !== 'site.login') {
                        $rootScope.returnToState = $rootScope.toState;
                        $rootScope.returnToStateParams = $rootScope.toStateParams;
                        $state.go('site.login');
                    }
                });
            }
        };
    };
    var run = ($rootScope, $state, $stateParams, authorization, principal, $http) => {
        ExpressChat.http = $http;
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            if (principal.isIdentityResolved())
                authorization.authorize();
        });
    };
    ExpressChat.expressChat.factory('responseObserver', ['$q', '$location', function responseObserver($q, $location) {
            return {
                'responseError': function (errorResponse) {
                    switch (errorResponse.status) {
                        case 401:
                            $location.path(ExpressChat.root + '/login');
                            break;
                    }
                    return $q.reject(errorResponse);
                }
            };
        }]);
    ExpressChat.expressChat.directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs['fileModel']);
                    var modelSetter = model.assign;
                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope, element[0]['files'][0]);
                        });
                    });
                }
            };
        }]);
    ExpressChat.expressChat.service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).success(function () { })
                    .error(function () { });
            };
        }]);
    ExpressChat.expressChat.factory('principal', ['$q', '$http', '$timeout', principal]);
    ExpressChat.expressChat.factory('authorization', ['$rootScope', '$state', '$location', 'principal', authorization]);
    ExpressChat.expressChat.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal', '$http', run]);
})(ExpressChat || (ExpressChat = {}));
//# sourceMappingURL=ExpressChat.js.map