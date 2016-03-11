(function () {
    "use strict";

    angular.module("app.services").factory("stringCalculator", [stringCalculatorFactory]);

    var DEFAULT_DELIMITER = ",",
        ESCAPED_NEWLINE_CHARACTER = "\\n",
        CUSTOM_DELIMITER_TRAILING_HEADER = "//",
        CUSTOM_DELIMITER_AND_NUMBERS_SEPARATOR = "\n",
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
        var delimiter,
            rawNumbers;

        if (hasCustomDelimiterTrailingHeader(numbers)) {
            var delimiterHeaderAndNumbers = numbers.split(CUSTOM_DELIMITER_AND_NUMBERS_SEPARATOR),
                customDelimiterHeader = delimiterHeaderAndNumbers[0];

            delimiter = extractDelimiter(customDelimiterHeader);
            rawNumbers = delimiterHeaderAndNumbers[1];
        } else {
            delimiter = createDefaultDelimiterPattern();
            rawNumbers = numbers;
        }

        return {
            rawNumberList: rawNumbers,
            delimiter: delimiter
        };
    }

    function extractDelimiter(customDelimiterHeader) {
        customDelimiterHeader = removeTrailingHeader(customDelimiterHeader);

        if (customDelimiterHeader === ";") {
            return ";";
        } else if (customDelimiterHeader === "[***]") {
            return "***";
        } else if (customDelimiterHeader === "[*][%]") {
            return new RegExp("\\*|\\%");
        } else if (customDelimiterHeader === "[@][**][$$$]") {
            return new RegExp("\\@|\\*\\*|\\$\\$\\$");
        }

        return createDefaultDelimiterPattern();
    }

    function removeTrailingHeader(customDelimiterHeader) {
        // Assumes the trailing header is at index 0
        return customDelimiterHeader.substring(CUSTOM_DELIMITER_TRAILING_HEADER.length);
    }

    function calculateSum(numberList) {
        var sum = 0;

        numberList.forEach(function (n) {
            sum += n;
        });

        return sum;
    }

    function createDefaultDelimiterPattern() {
        var delimiterPatternString = DEFAULT_DELIMITER + "|" + ESCAPED_NEWLINE_CHARACTER;

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