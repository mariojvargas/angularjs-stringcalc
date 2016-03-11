(function () {
    "use strict";

    angular.module("app.services").factory("stringCalculator", [stringCalculatorFactory]);

    var DEFAULT_DELIMITER = ",";
    
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

        return parsedNumbers;
    }

    function calculateSum(numberList) {
        var sum = 0;

        numberList.forEach(function (n) {
            sum += n;
        });

        return sum;
    }
})();