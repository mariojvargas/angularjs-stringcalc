describe("StringCalculatorController", function () {
    beforeEach(module("app.controllers"));

    var $controller;    

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe("Initialization", function () {
        var $scope;

        beforeEach(function () {
            var fakeStringCalculator = createFakeStringCalculator();

            $scope = {};
            createStringCalculatorController($scope, fakeStringCalculator);
        });

        it("should have a blank numbers property", function () {
            expect($scope.numbers).toBe("");
        });

        it("should have a blank sumOfNumbers property", function () {
            expect($scope.sumOfNumbers).toBe("");
        });
    });

    describe("calculateSum() method", function () {
        describe("Given a valid comma-delimited list of numbers", function () {
            var expectedNumbers, expectedSum, fakeStringCalculator, $scope;

            beforeEach(function () {
                expectedNumbers = "1,2,3,4";
                expectedSum = 10;

                fakeStringCalculator = createFakeStringCalculator();

                spyOn(fakeStringCalculator, "add").and.returnValue(expectedSum);

                $scope = {};

                var stringCalculatorController = createStringCalculatorController($scope, fakeStringCalculator);

                $scope.numbers = expectedNumbers;
                $scope.calculateSum();
            });

            it("should calculate the sum of those numbers via injected stringCalculator", function () {                
                expect(fakeStringCalculator.add).toHaveBeenCalled();
                expect(fakeStringCalculator.add.calls.argsFor(0)).toEqual([expectedNumbers]);
            });

            it("should assign the sum to the sumOfNumbers property", function () {
                expect($scope.sumOfNumbers).toBe(expectedSum);
            });
        });
    });

    function createStringCalculatorController($scope, stringCalculator) {
        return $controller("StringCalculatorController", {
            $scope: $scope, 
            stringCalculator: stringCalculator
        });
    }

    function createFakeStringCalculator() {
        return {
            add: function () {}
        };
    }
});