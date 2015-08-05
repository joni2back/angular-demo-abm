(function(angular) {
    "use strict";
    angular.module('TestApp').controller('ProductDetailCtrl', ['$scope', '$http', '$routeParams', 'product', function($scope, $http, $routeParams, Product) {

        $scope.productId = $routeParams.productId;
        $scope.product = new Product();
        $scope.requesting = false;

        $scope.getDetails = function() {
            var url = '/api/product/:productId'.replace(':productId', $scope.productId);
            $scope.requesting = true;
            return $http.get(url, {}).success(function(data) {
                $scope.product = new Product(data);
            }).error(function(data) {
            })['finally'](function() {
                $scope.requesting = false;
            });
        };

        $scope.$on('$routeChangeSuccess', function(next, current) {
            $scope.getDetails();
        });
        
    }]);
})(angular);