(function () {
    "use strict";

    angular.module("app.filters").filter("reverse", [reverseFilterFactory]);

    function reverseFilterFactory() {
       return reverseFilter; 
    }

    function reverseFilter(input) {
        input = input || "";

        if (String !== input.constructor) {
            return "";
        }

        return input.split("").reverse().join("");
    }
}());
