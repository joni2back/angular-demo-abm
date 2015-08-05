(function(angular) {
    "use strict";
    angular.module('TestApp').factory('product', function() {

        var Product = function() {
            this.id = null;
            this.name = '';
            this.description = '';
            this.price = 0;

            this.comments = [];

            angular.extend(this, arguments[0]);
        };

        return Product;
    });
})(angular);
