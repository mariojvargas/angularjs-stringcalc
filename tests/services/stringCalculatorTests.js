describe("StringCalculator Service", function () {
    beforeEach(module("app.services"));

    var stringCalculator;

    beforeEach(inject(function (_stringCalculator_){ 
        stringCalculator = _stringCalculator_;
    }));

    it("is defined", function () {
        expect(stringCalculator).toBeTruthy();
        expect(stringCalculator.constructor).toBe(Object.prototype.constructor);
    });
});