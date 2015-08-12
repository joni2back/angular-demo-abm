(function(angular) {
    "use strict";
    angular.module('TestApp').controller('MainCtrl', ['$scope', '$route', 'authService', function($scope, $route, authService) {

        $scope.$route = $route;
        $scope.authService = authService;

    }]);
})(angular);