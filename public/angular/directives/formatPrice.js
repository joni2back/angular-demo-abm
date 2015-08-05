(function(angular) {
    "use strict";
    angular.module('TestApp').filter('formatPrice', ['$filter', function($filter) {
        return function(input, limit) {
            return '$ %d'.replace('%d', input.toFixed(2));
        };
    }]);
})(angular);