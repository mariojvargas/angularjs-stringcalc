(function () {
    "use strict";

    angular
        .module("app.services")
        .service("stringCalculator", [
            "stringCalculatorParser",
            "stringCalculatorValidator",
            "numberCalculator",
            StringCalculator
        ]);

    function StringCalculator(stringCalculatorParser, stringCalculatorValidator, numberCalculator) {
        this.add = add;

        function add(numbers) {
            if ("" === numbers) {
                return 0;
            }

            var parsedNumbers = stringCalculatorParser.parse(numbers);

            stringCalculatorValidator.validateWithError(parsedNumbers);

            return numberCalculator.sum(parsedNumbers);
        }
    }
}());