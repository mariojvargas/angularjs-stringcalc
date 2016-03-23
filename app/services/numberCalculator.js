(function () {
    "use strict";

    angular.module("app.services").service("numberCalculator", NumberCalculator);

    function NumberCalculator() {
    }

    NumberCalculator.prototype.add = function (a, b) {
        return a + b;
    };

    NumberCalculator.prototype.sum = function (numbers) {
        return numbers.reduce(this.add);
    };
}());
