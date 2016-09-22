describe("ReverseController", function () {
    var fakeReverseFilter;

    // See: https://docs.angularjs.org/api/ng/provider/$filterProvider
    beforeEach(module("app.controllers", function ($filterProvider) {
        fakeReverseFilter = jasmine.createSpy("fakeReverseFilter");

        $filterProvider.register("reverse", function () {
            return fakeReverseFilter;
        });
    }));

    beforeEach(inject(function ($controller) {
        reverseController = $controller("ReverseController");
    }));

    describe("reverse() method", function () {
        it("delegates to the reverse filter", function () {
            var value = "reverse";
            var expectedValue = "esrever";

            fakeReverseFilter.and.returnValue(expectedValue);

            var actualValue = reverseController.reverse(value);

            expect(fakeReverseFilter).toHaveBeenCalledWith(value);
            expect(actualValue).toBe(expectedValue);
        });
    });
});