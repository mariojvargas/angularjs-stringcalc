(function () {
    "use strict";

    angular.module("app.services").factory("stringCalculator", [stringCalculatorFactory]);

    var DEFAULT_DELIMITER = ",",
        NEWLINE_DELIMITER_PATTERN_STRING = "\\n",
        CUSTOM_DELIMITER_TRAILING_HEADER = "//",
        MAXIMUM_NUMBER_TO_ADD = 1000;

    function stringCalculatorFactory() {
        return {
            add: add
        };
    }

    function add(numbers) {
        if (numbers) {
            var parsedNumbers = parseNumbers(numbers);

            ensureNoNegatives(parsedNumbers);

            return calculateSum(parsedNumbers);
        }

        return 0;
    }

    function parseNumbers(numbers) {
        var numbersInfo = analyzeNumbers(numbers);

        var rawNumbers = numbersInfo.rawNumberList.split(numbersInfo.delimiter);

        var parsedNumbers = rawNumbers.map(function (s) { 
            return parseInt(s, 10); 
        });

        var numbersUptoMaximum = parsedNumbers.filter(function (n) {
            return n <= MAXIMUM_NUMBER_TO_ADD;
        });

        return numbersUptoMaximum;
    }

    function analyzeNumbers(numbers) {
        var delimiter = extractDelimiter(numbers);

        if (numbers.indexOf(CUSTOM_DELIMITER_TRAILING_HEADER) === 0) {
            numbers = numbers.split("\n")[1];
        }

        return {
            rawNumberList: numbers,
            delimiter: delimiter
        };
    }

    function extractDelimiter(numbers) {
        if (numbers.indexOf("//;") === 0) {
            return ";";
        } else if (numbers.indexOf("//[***]") === 0) {
            return "***";
        } else if (numbers.indexOf("//[*][%]") === 0) {
            return new RegExp("\\*|\\%");
        }

        return createDefaultDelimiterPattern();
    }

    function calculateSum(numberList) {
        var sum = 0;

        numberList.forEach(function (n) {
            sum += n;
        });

        return sum;
    }

    function createDefaultDelimiterPattern() {
        var delimiterPatternString = DEFAULT_DELIMITER + "|" + NEWLINE_DELIMITER_PATTERN_STRING;

        return new RegExp(delimiterPatternString);
    }

    function ensureNoNegatives(numberList) {
        var negativeNumbers = numberList.filter(function (n) { 
            return n < 0; 
        });

        if (negativeNumbers.length) {
            throw new Error("Negatives not allowed: " + negativeNumbers.join(", "));
        }
    }

    function hasCustomDelimiterTrailingHeader(rawNumbers) {
        return rawNumbers.indexOf(CUSTOM_DELIMITER_TRAILING_HEADER) === 0;
    }
})();