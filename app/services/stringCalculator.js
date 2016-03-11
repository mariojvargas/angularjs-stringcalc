(function () {
    "use strict";

    angular.module("app.services").factory("stringCalculator", [stringCalculatorFactory]);

    function stringCalculatorFactory() {
        return {
            add: add
        };
    }

    function add(numbers) {
        var sum = 0;

        if (numbers) {
            var parsedNumbers = numbers.split(",").map(function (s) { return parseInt(s, 10); });

            parsedNumbers.forEach(function (n) {
                sum += n;
            });
        }

        return sum;
    }
})();