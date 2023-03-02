var NumericInput = /** @class */ (function () {
    function NumericInput(divID) {
        var _this = this;
        this.divID = divID;
        var numInput = document.getElementById(divID);
        numInput.innerHTML = "<input\n    id=\"input\"\n    type=\"text\"\n    />\n    <div id=\"result\">?</div>";
        numInput.className = 'non-focused valid';
        var numInputClasses = numInput.classList;
        var input = document.getElementById('input');
        input.addEventListener('focus', function () {
            numInputClasses.replace('non-focused', 'focused');
        });
        input.addEventListener('blur', function () {
            numInputClasses.replace('focused', 'non-focused');
        });
        input.addEventListener('input', function () {
            var numbers = /^[0-9\+\-\*\/\(\)]+$/;
            var result = document.getElementById('result');
            if (numbers.test(input.value)) {
                try {
                    result.innerHTML = _this.getResult(input.value);
                    numInputClasses.replace('invalid', 'valid');
                }
                catch (error) {
                    result.innerHTML = '?';
                    numInputClasses.replace('valid', 'invalid');
                }
            }
            else
                result.innerHTML = '?';
        });
    }
    NumericInput.prototype.getResult = function (equation) {
        var operation = new Function('a', "return new Function('return ' + a)();");
        return operation(equation);
    };
    return NumericInput;
}());
var numInput = new NumericInput('numInput');
