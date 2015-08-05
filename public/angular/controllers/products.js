(function(angular) {
    "use strict";
    angular.module('TestApp').controller('ProductsCtrl', ['$scope', '$http', 'product', function($scope, $http, Product) {

        $scope.orderProp = ['id', 'title'];
        $scope.temp = new Product();
        $scope.products = [];
        $scope.requesting = false;

        $scope.listProducts = function() {
            var data = {};
            $scope.products = [];
            $scope.requesting = true;
            return $http.get('/api/products.json', data).success(function(data) {
                $scope.products = data.map(function(obj) {
                    return new Product(obj);
                });
            }).error(function(data) {
            })['finally'](function() {
                $scope.requesting = false;
            });
        };

        $scope.$on('$routeChangeSuccess', function(next, current) {
            $scope.listProducts();
        });
        
    }]);
})(angular);