(function(angular) {
    "use strict";
    var app = angular.module('TestApp', ['ngRoute', 'LocalStorageModule']);
    
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: '/angular/views/login-form.html',
            controller: 'LoginCtrl',
            activeTab: 'login'
        }).
        when('/products', {
            templateUrl: '/angular/views/products-list.html',
            controller: 'ProductsCtrl',
            activeTab: 'products'
        }).
        otherwise({
            templateUrl: '/angular/views/main.html',
            controller: 'MainCtrl',
            activeTab: 'main'
        });
    }]);

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }]);
    
    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);

})(angular);
