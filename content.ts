class NumericInput {
  private divID: string;

  public constructor(divID: string) {
    this.divID = divID;

    const numInput = document.getElementById(divID) as HTMLDivElement;
    numInput.innerHTML = `<input
    id="input"
    type="text"
    />
    <div id="result">?</div>`;
    numInput.className = 'non-focused valid';
    let numInputClasses = numInput.classList;

    const input = document.getElementById('input') as HTMLInputElement;

    input.addEventListener('focus', () => {
      numInputClasses.replace('non-focused', 'focused');
    });
    input.addEventListener('blur', () => {
      numInputClasses.replace('focused', 'non-focused');
    });

    input.addEventListener('input', () => {
      const numbers = /^[0-9\+\-\*\/\(\)]+$/;

      const result = document.getElementById('result') as HTMLDivElement;

      if (numbers.test(input.value)) {
        try {
          result.innerHTML = this.getResult(input.value);
          numInputClasses.replace('invalid', 'valid');
        } catch (error) {
          result.innerHTML = '?';
          numInputClasses.replace('valid', 'invalid');
        }
      } else result.innerHTML = '?';
    });
  }

  public getResult(equation: string): string {
    const operation = new Function(
      'a',
      "return new Function('return ' + a)();"
    );
    return operation(equation);
  }
}

let numInput = new NumericInput('numInput');
