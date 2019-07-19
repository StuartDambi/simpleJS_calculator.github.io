// Get the History and Print it on screen
const getHistory = () => {
    return document.getElementById('history-value').innerText;
}
const printHistory = (num) => {
    document.getElementById('history-value').innerText = num;
}

// Get the output and print it on screen
const getOutput = () => {
    return document.getElementById('output-value').innerText;
}
const printOutput = (num) => {
    if (num == '') {
        document.getElementById('output-value').innerHTML = num;
    } else {
        document.getElementById('output-value').innerText = getFormattedNumber(num);
    }
}
// Format numbers and put commas after three values E.g 1,000,000
const getFormattedNumber = (num) => {
    if (num == '-') {
        return ''; // helps in deleting the negative number
    }
    let n = Number(num);
    let value = n.toLocaleString('en');
    return value;
}
// Then remove the commas from the figure displayed for processing
const reverseNumberFormat = (num) => {
    return Number(num.replace(/,/g, ''));
}

// Event listener for Operators
let operator = document.getElementsByClassName('operator');
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        // The clear Button
        if (this.id == 'clear') {
            printHistory('');
            printOutput('');
        }
        // The delete button
        if (this.id == 'backspace') {
            let output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                // If output has a value
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else {
            let output = getOutput();
            let history = getHistory();
            if(output == '') {output = 0;} //default value
            if (output == '' && history != '') {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output != '' || history != '') {
                // condition?true:false
                output = output == '' ?
                    output : reverseNumberFormat(output);
                history = history + output;
                if (this.id == '=') {
                    let result = eval(history);
                    printOutput(result);
                    printHistory('');
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput('');
                }
            }
        }
    });
}

// Event listener for Numbers
let number = document.getElementsByClassName('number');
for (let i = 0; i < operator.length; i++) {
    number[i].addEventListener('click', function () {
        let output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            // If output is a number
            output = output + this.id;
            printOutput(output);
        }
    });
}