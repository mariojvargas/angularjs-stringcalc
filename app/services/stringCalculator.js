(function () {
    "use strict";

    angular
        .module("app.services")
        .factory("stringCalculator", [
            "stringCalculatorParser",
            "stringCalculatorValidator",
            "numberCalculator",
            stringCalculatorFactory
    ]);

    function stringCalculatorFactory(stringCalculatorParser, stringCalculatorValidator, numberCalculator) {
        function StringCalculator() {
        }

        StringCalculator.prototype.add = function (numbers) {
            if ("" === numbers) {
                return 0;
            }

            var parsedNumbers = stringCalculatorParser.parse(numbers);

            stringCalculatorValidator.validateWithError(parsedNumbers);

            return numberCalculator.sum(parsedNumbers);
        };

        return new StringCalculator();
    }
}());