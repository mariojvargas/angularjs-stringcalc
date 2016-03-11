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

        it("should be able to handle new lines between numbers, so it should return 6 given the string '1\\n2,3'", function () {
            // Arrange
            var numbers = "1\n2,3",
                expectedValue = 6;

            // Act
            var actualValue = stringCalculator.add(numbers);

            // Assert
            expect(actualValue).toBe(expectedValue);
        });

        it("should throw an error given the string contains a negative number", function () {
            // Arrange
            var numbers = "1,-1,3";

            // Act
            var addMethodWrapper = wrapAddMethod(numbers);

            // Assert
            expect(addMethodWrapper).toThrowError(Error);
        });

        it("should throw an error with the message 'Negatives not allowed: -5' given the string '1,4,-5,6'", function () {
            // Arrange
            var numbers = "1,4,-5,6",
                expectedErrorMessage = "Negatives not allowed: -5";

            // Act
            var addMethodWrapper = wrapAddMethod(numbers);

            // Assert
            expect(addMethodWrapper).toThrowError(expectedErrorMessage);
        });

        it("should throw an error with the message 'Negatives not allowed: -1,-42,-3' given the string '-1,4,-42,6,-3'", function () {
            // Arrange
            var numbers = "-1,4,-42,6,-3",
                expectedErrorMessage = "Negatives not allowed: -1, -42, -3";

            // Act
            var addMethodWrapper = wrapAddMethod(numbers);

            // Assert
            expect(addMethodWrapper).toThrowError(expectedErrorMessage);
        });

        function wrapAddMethod(numbers) {
            return function () {
                stringCalculator.add(numbers);
            };
        }
    });
});