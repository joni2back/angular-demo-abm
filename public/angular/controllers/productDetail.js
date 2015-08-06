(function(angular) {
    "use strict";
    angular.module('TestApp').controller('ProductDetailCtrl', ['$scope', '$http', '$routeParams', 'product', 'comment', 
        function($scope, $http, $routeParams, Product, Comment) {

        $scope.productId = $routeParams.productId;
        $scope.product = new Product();
        $scope.tempComment = new Comment();

        $scope.successComment = false;
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

        $scope.commentAgain = function() {
            $scope.tempComment = new Comment();
            $scope.successComment = false;
        };

        $scope.leaveComment = function() {
            var data = $scope.tempComment;
            var url = '/api/product/:productId/comment/create'.replace(':productId', $scope.productId);

            $scope.requesting = true;
            return $http.post(url, data).success(function(data) {
                if (data) {
                    $scope.successComment = data;
                    $scope.getDetails();
                }
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