(function () {
    "use strict";

    angular.module("app.services").factory("stringCalculator", [stringCalculatorFactory]);

    var DEFAULT_DELIMITER = ",",
        MAXIMUM_NUMBER_TO_ADD = 1000;

    function stringCalculatorFactory() {
        return {
            add: add
        };
    }

    function add(numbers) {
        if (numbers) {
            var parsedNumbers = parseNumbers(numbers);

            return calculateSum(parsedNumbers);
        }

        return 0;
    }

    function parseNumbers(numbers) {
        var rawNumbers = numbers.split(DEFAULT_DELIMITER);

        var parsedNumbers = rawNumbers.map(function (s) { 
            return parseInt(s, 10); 
        });

        return parsedNumbers.filter(function (n) {
            return n <= MAXIMUM_NUMBER_TO_ADD;
        });
    }

    function calculateSum(numberList) {
        var sum = 0;

        numberList.forEach(function (n) {
            sum += n;
        });

        return sum;
    }
})();