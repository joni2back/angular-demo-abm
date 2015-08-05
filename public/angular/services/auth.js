(function(angular) {
    "use strict";
    angular.module('TestApp').factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            username : ""
        };

        var _login = function (loginData) {
            var deferred = $q.defer();
            $http.post('/auth.json', loginData).success(function (response) {
                if (response.success) {
                    var authorizationData = { token: response.token, username: response.username };
                    localStorageService.set('authorizationData', authorizationData);

                    _authentication.isAuth = true;
                    _authentication.username = response.username;
                    deferred.resolve(response);
                } else {
                    _logOut();
                    deferred.reject(response);
                }
            }).error(function (response) {
                _logOut();
                deferred.reject(response);
            });
            return deferred.promise;
        };

        var _logOut = function () {
            localStorageService.remove('authorizationData');
            _authentication.isAuth = false;
            _authentication.username = "";
        };

        var _fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.username = authData.username;
            }
        };

        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;

        return authServiceFactory;
    }]);
})(angular);