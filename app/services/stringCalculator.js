(function () {
    "use strict";

    angular
        .module("app.services")
        .factory("stringCalculator", [
            "stringCalculatorValidator",
            "numberCalculator",
            stringCalculatorFactory
    ]);

    function stringCalculatorFactory(stringCalculatorValidator, numberCalculator) {
        function StringCalculator() {
        }

        StringCalculator.prototype.add = function (numbers) {
            if ("" === numbers) {
                return 0;
            }

            var numberStringParser = new StringCalculatorParser();

            var parsedNumbers = numberStringParser.parse(numbers);

            stringCalculatorValidator.validateWithError(parsedNumbers);

            return numberCalculator.sum(parsedNumbers);
        };

        return new StringCalculator();
    }

    function StringCalculatorParser() {
    }

    StringCalculatorParser.prototype.parse = function (numbers) {
        var DEFAULT_DELIMITER = ",",
            ESCAPED_NEWLINE_CHARACTER = "\\n",
            CUSTOM_DELIMITER_TRAILING_HEADER = "//",
            CUSTOM_DELIMITER_AND_NUMBERS_SEPARATOR = "\n",
            CUSTOM_DELIMITER_PATTERN_STRING = "\\[([^\\]]+)\\]",
            MAXIMUM_NUMBER_TO_ADD = 1000;

        return parseNumbers(numbers);

        function parseNumbers(numbers) {
            var numbersInfo = analyzeNumbers(numbers);

            var rawNumbers = numbersInfo.rawNumberList.split(numbersInfo.delimiter);

            var parsedNumbers = rawNumbers.map(function (s) { 
                return parseInt(s, 10); 
            });

            return parsedNumbers.filter(function (n) {
                return n <= MAXIMUM_NUMBER_TO_ADD;
            });
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
            var rawCustomDelimiter = removeTrailingHeader(customDelimiterHeader);

            if (1 === rawCustomDelimiter.length) {
                return rawCustomDelimiter;
            } 

            var delimiterMatches = rawCustomDelimiter.match(new RegExp(CUSTOM_DELIMITER_PATTERN_STRING, "g"));

            if (1 === delimiterMatches.length) {
                return unwrapSingleCustomDelimiter(rawCustomDelimiter, CUSTOM_DELIMITER_PATTERN_STRING);
            }

            return convertMultipleCustomDelimitersToRegularExpression(delimiterMatches, CUSTOM_DELIMITER_PATTERN_STRING);
        }

        function convertMultipleCustomDelimitersToRegularExpression(delimiterMatches, delimiterPatternString) {
            var delimiters = unwrapCustomDelimiters(delimiterMatches, delimiterPatternString);

            var escapedDelimiters = escapeDelimitersForRegularExpressions(delimiters);

            var combinedDelimiterPattern = escapedDelimiters.join("|");

            return new RegExp(combinedDelimiterPattern);
        }

        function escapeDelimitersForRegularExpressions(delimiters) {
            return delimiters.map(function (delimiter) {
                var delimiterCharacters = delimiter.split("");

                var escapedCharacters = delimiterCharacters.map(escapeForUseInRegularExpression);

                return escapedCharacters.join("");
            });
        }

        function escapeForUseInRegularExpression(s) {
            return "\\" + s;
        }

        function unwrapCustomDelimiters(rawDelimiters, customDelimiterPatternString) {
            return rawDelimiters.map(function (s) {
                return unwrapSingleCustomDelimiter(s, customDelimiterPatternString);
            });
        }

        function unwrapSingleCustomDelimiter(rawDelimiter, delimiterPatternString) {
            return rawDelimiter.match(new RegExp(delimiterPatternString))[1];
        }

        function removeTrailingHeader(customDelimiterHeader) {
            if (customDelimiterHeader.indexOf(CUSTOM_DELIMITER_TRAILING_HEADER) === 0) {
                return customDelimiterHeader.substring(CUSTOM_DELIMITER_TRAILING_HEADER.length);
            }

            return customDelimiterHeader;
        }

        function createDefaultDelimiterPattern() {
            var delimiterPatternString = DEFAULT_DELIMITER + "|" + ESCAPED_NEWLINE_CHARACTER;

            return new RegExp(delimiterPatternString);
        }

        function hasCustomDelimiterTrailingHeader(rawNumbers) {
            return rawNumbers.indexOf(CUSTOM_DELIMITER_TRAILING_HEADER) === 0;
        }
    };
}());