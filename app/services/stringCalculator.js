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
            var delimiterHeaderAndNumbers = numbers.split(CUSTOM_DELIMITER_AND_NUMBERS_SEPARATOR);

            delimiter = extractCustomDelimiter(delimiterHeaderAndNumbers[0]);
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

    function extractCustomDelimiter(customDelimiterHeader) {
        customDelimiterHeader = removeTrailingHeader(customDelimiterHeader);

        var customDelimiterPatternString = "\\[([^\\]]+)\\]";
        
        var delimiterMatches = customDelimiterHeader.match(new RegExp(customDelimiterPatternString, "g"));

        if (null === delimiterMatches) {
            return customDelimiterHeader;
        } else if (customDelimiterHeader === "[@][**][$$$]") {
            return new RegExp("\\@|\\*\\*|\\$\\$\\$");
        } else if (delimiterMatches.length > 1) {
            var delimiters = delimiterMatches.map(function (s) {
                return extractCustomDelimiterWithPattern(s, customDelimiterPatternString);
            });

            var escapedDelimiters = delimiters.map(function (s) {
                return "\\" + s;
            });

            var combinedDelimiterPattern = escapedDelimiters.join("|");

            return new RegExp(combinedDelimiterPattern);
        }

        return extractCustomDelimiterWithPattern(customDelimiterHeader, customDelimiterPatternString);
    }

    function extractCustomDelimiterWithPattern(rawDelimiter, delimiterPatternString) {
        return rawDelimiter.match(new RegExp(delimiterPatternString))[1]
    }

    function removeTrailingHeader(customDelimiterHeader) {
        if (customDelimiterHeader.indexOf(CUSTOM_DELIMITER_TRAILING_HEADER) === 0) {
            return customDelimiterHeader.substring(CUSTOM_DELIMITER_TRAILING_HEADER.length);
        }

        return customDelimiterHeader;
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