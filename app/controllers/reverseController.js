(function () {
    "use strict";

    angular.module("app.controllers").controller("ReverseController", ["$filter", function ($filter) {
        var vm = this;

        vm.reverse = function (stringToReverse) {
            return $filter("reverse")(stringToReverse);
        };
    }]);
}());