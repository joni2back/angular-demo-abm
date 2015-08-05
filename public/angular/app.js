(function(angular) {
    "use strict";
    var app = angular.module('TestApp', ['ngRoute', 'LocalStorageModule']);
    
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: '/angular/views/loginForm.html',
            controller: 'LoginCtrl',
            activeTab: 'login'
        }).
        when('/products', {
            templateUrl: '/angular/views/productList.html',
            controller: 'ProductListCtrl',
            activeTab: 'productList'
        }).
        when('/product/create', {
            templateUrl: '/angular/views/productCreate.html',
            controller: 'ProductCreateCtrl',
            activeTab: 'productCreate'
        }).
        when('/product/detail/:productId', {
            templateUrl: '/angular/views/productDetail.html',
            controller: 'ProductDetailCtrl',
            activeTab: 'productDetail'
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
