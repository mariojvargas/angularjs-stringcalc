describe("Filters", function () {
    beforeEach(module("app.filters"));

    describe("Reverse Filter", function () {
        var reverse;

        beforeEach(inject(function ($filter) {
            reverse = $filter("reverse", {});
        }));

        describe("Given an empty string", function () {
            it("should return an empty string", function () {
                expect(reverse("")).toBe("");
            });
        });

        describe("Given a single character", function () {
            it("should return the same character", function () {
                var expectedValue = "a";

                var actualValue = reverse(expectedValue);

                expect(actualValue).toBe(expectedValue);
            });
        });

        describe("Given a null value", function () {
            it("should return an empty string", function () {
                var expectedValue = "";

                var actualValue = reverse(null);

                expect(actualValue).toBe(expectedValue);
            })
        });

        describe("Given a valid string", function () {
            it("should reverse the string", function () {
                var stringToReverse = "lorem ipsum",
                    expectedValue = "muspi merol";

                var actualValue = reverse(stringToReverse);

                expect(actualValue).toBe(expectedValue);
            })
        });

        describe("Given a value that is not a string", function () {
            it("should return an empty string", function () {
                var expectedValue = "",
                    invalidValue = 1234;

                var actualValue = reverse(invalidValue);

                expect(actualValue).toBe(expectedValue);
            })
        });
    });
});
