describe("StringCalculator Service", function () {
    beforeEach(module("app.services"));

    var stringCalculator;

    beforeEach(inject(function (_stringCalculator_){ 
        stringCalculator = _stringCalculator_;
    }));

    describe("add() method", function () {
        it("should return 0 given an empty string", function () {
            // Arrange
            var numbers = "",
                expectedValue = 0;

            // Act
            var actualValue = stringCalculator.add(numbers);

            // Assert
            expect(actualValue).toBe(expectedValue);
        });
    });
});