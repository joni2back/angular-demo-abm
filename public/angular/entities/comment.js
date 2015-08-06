(function(angular) {
    "use strict";
    angular.module('TestApp').factory('comment', function() {

        var Comment = function() {
            this.id = null;
            this.user = '';
            this.comment = '';
            this.date = '';

            angular.extend(this, arguments[0]);
        };

        return Comment;
    });
})(angular);
