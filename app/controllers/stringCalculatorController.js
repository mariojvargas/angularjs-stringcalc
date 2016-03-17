(function () {
    "use strict";

    angular.module("app.controllers").controller("StringCalculatorController", ["$scope", "stringCalculator", function ($scope, stringCalculator) {
        var vm = $scope;

        vm.numbers = "";
        vm.sumOfNumbers = "";

        vm.calculateSum = function () {
            vm.sumOfNumbers = stringCalculator.add(vm.numbers);
        };
    }]);
}());