describe("StringCalculator Service", function () {
    beforeEach(module("app.services"));

    var stringCalculator;

    beforeEach(inject(function (_stringCalculator_){ 
        stringCalculator = _stringCalculator_;
    }));

    describe("add() method", function () {
        it("should return 0, given an empty string", function () {
            // Arrange
            var numbers = "",
                expectedValue = 0;

            // Act
            var actualValue = stringCalculator.add(numbers);

            // Assert
            expect(actualValue).toBe(expectedValue);
        });

        it("should return 42, given the string '42'", function () {
            // Arrange
            var numbers = "42",
                expectedValue = 42;

            // Act
            var actualValue = stringCalculator.add(numbers);

            // Assert
            expect(actualValue).toBe(expectedValue);
        });

        it("should return 50, given the string '42,8'", function () {
            // Arrange
            var numbers = "42,8",
                expectedValue = 50;

            // Act
            var actualValue = stringCalculator.add(numbers);

            // Assert
            expect(actualValue).toBe(expectedValue);
        });

        it("should return 10, given the string '1,5,4'", function () {
            // Arrange
            var numbers = "1,5,4",
                expectedValue = 10;

            // Act
            var actualValue = stringCalculator.add(numbers);

            // Assert
            expect(actualValue).toBe(expectedValue);
        });

        it("should return the sum of the numbers, given an unknown list of comma-separated numbers", function () {
            // Arrange
            var numbers = "1,5,4,6,7,8,100",
                expectedValue = 131;

            // Act
            var actualValue = stringCalculator.add(numbers);

            // Assert
            expect(actualValue).toBe(expectedValue);
        });

        it("should ignore numbers bigger than 1000, so it should return 1500 given the string '300,150,1001,50,1000'", function () {
            // Arrange
            var numbers = "300,150,1001,50,1000",
                expectedValue = 1500;

            // Act
            var actualValue = stringCalculator.add(numbers);

            // Assert
            expect(actualValue).toBe(expectedValue);
        });
    });
});