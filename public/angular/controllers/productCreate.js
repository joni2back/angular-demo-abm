(function(angular) {
    "use strict";
    angular.module('TestApp').controller('ProductCreateCtrl', ['$scope', '$http', 'product', function($scope, $http, Product) {

        $scope.product = new Product();
        $scope.requesting = false;
        $scope.success = false;

        $scope.create = function() {
            var data = $scope.product;
            $scope.requesting = true;
            return $http.post('/api/product/create', data).success(function(data) {
                $scope.success = data;
                //$scope.product = new Product(fata);
            }).error(function(data) {
            })['finally'](function() {
                $scope.requesting = false;
            });
        };

        $scope.$on('$routeChangeSuccess', function(next, current) {
            
        });
        
    }]);
})(angular);