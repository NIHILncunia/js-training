let numOne = '';
let numTwo = '';
let operator = '';
const operatorString = ['+', '-', '×', '÷',];
const $operator = document.querySelector('input#operator');
const $result = document.querySelector('input#result');
const $numberButtons = [...document.querySelectorAll('button.number'),];
const $operatorButtons = [...document.querySelectorAll('button.operator'),];
const $clearButton = document.querySelector('button.clear');
const $calculateButton = document.querySelector('button.calculate');
$numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log('클릭함');
        if (!operator) {
            numOne += button.textContent;
            $result.value += button.textContent;
            return;
        }
        if (!numTwo) {
            $result.value = '';
        }
        numTwo += button.textContent;
        $result.value += button.textContent;
        console.log(`numOne: ${numOne} / numTwo: ${numTwo}`);
    });
});
const onClickOperator = (operatorString) => () => {
    if (numOne) {
        $operator.value = operatorString;
        operator = operatorString;
    }
};
$operatorButtons.forEach((button, index) => {
    button.addEventListener('click', onClickOperator(operatorString[index]));
});
$calculateButton.addEventListener('click', () => {
    switch (operator) {
        case '+':
            $result.value = (parseInt(numOne, 10) + parseInt(numTwo, 10)).toString();
            break;
        case '-':
            $result.value = (parseInt(numOne, 10) - parseInt(numTwo, 10)).toString();
            break;
        case '×':
            $result.value = (parseInt(numOne, 10) * parseInt(numTwo, 10)).toString();
            break;
        case '÷':
            $result.value = (parseInt(numOne, 10) / parseInt(numTwo, 10)).toString();
            break;
        default:
            break;
    }
});
$clearButton.addEventListener('click', () => {
    numOne = '';
    numTwo = '';
    operator = '';
    $result.value = '';
    $operator.value = '';
});
//# sourceMappingURL=index.js.map