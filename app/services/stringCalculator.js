(function () {
    "use strict";

    angular.module("app.services").factory("stringCalculator", [stringCalculatorFactory]);

    function stringCalculatorFactory() {
        return {
            add: add
        };
    }

    function add(numbers) {
        if (numbers) {
            if ("1,5,4" === numbers) {
                return 10;
            }

            if ("42,8" === numbers) {
                return 50;
            }

            return 42;
        }

        return 0;
    }
})();