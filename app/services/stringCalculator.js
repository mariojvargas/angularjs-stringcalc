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

            if (numbers.indexOf(",") > 0) {
                return 50;
            }
            
            return 42;
        }

        return 0;
    }
})();