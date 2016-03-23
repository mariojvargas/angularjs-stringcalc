(function () {
    "use strict";

    angular.module("app.services").service("stringCalculatorValidator", StringCalculatorValidator);

    function StringCalculatorValidator() {
    }

    StringCalculatorValidator.prototype.validateWithError = function (numbersToValidate) {
        ensureNoNegatives(numbersToValidate);

        function ensureNoNegatives(numberList) {
            var negativeNumbers = numberList.filter(function (n) {
                return n < 0;
            });

            if (negativeNumbers.length) {
                throw new Error("Negatives not allowed: " + negativeNumbers.join(", "));
            }
        }
    };
}());