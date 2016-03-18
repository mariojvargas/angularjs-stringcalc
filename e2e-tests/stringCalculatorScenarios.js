describe("String Calculator App", function () {
    var STRING_CALCULATOR_PAGE_URL = "http://localhost:8000/index.html";

    var stringCalculatorPage;

    beforeEach(function () {
        stringCalculatorPage = new StringCalculatorPage();

        stringCalculatorPage.load();
    });

    it("should have a title", function () {
        expect(stringCalculatorPage.getTitle()).toBe("String Calculator");
    });

    it("should have a String Calculator main header", function () {
        var mainHeader = stringCalculatorPage.getMainHeader();

        expect(mainHeader).toBe("String Calculator");
    });

    describe("Given a valid list of comma-delimited numbers", function () {
        var expectedSum;

        beforeEach(function () {
            var numbersList = "1,2,3,4,5";

            stringCalculatorPage.setNumbers(numbersList);

            expectedSum = 15;
        });

        it("should calculate and display the sum", function () {
            stringCalculatorPage.calculateSum();

            expect(stringCalculatorPage.getSum()).toBe(expectedSum.toString());
        });
    });

    function StringCalculatorPage() {
    }

    StringCalculatorPage.prototype.load = function () {
        browser.get(STRING_CALCULATOR_PAGE_URL);
    };

    StringCalculatorPage.prototype.getTitle = function () {
        return browser.getTitle();
    };

    StringCalculatorPage.prototype.getMainHeader = function () {
        return element(by.id("main-header")).getText();
    };

    StringCalculatorPage.prototype.setNumbers = function (value) {
        var numbersTextField = element(by.id("numbers"));

        numbersTextField.sendKeys(value);
    };

    StringCalculatorPage.prototype.calculateSum = function () {
        element(by.id("calculate-sum-button")).click();
    };

    StringCalculatorPage.prototype.getSum = function () {
        return element(by.id("sum-of-numbers")).getText();
    };
});