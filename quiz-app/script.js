const questionBank = [


    {
        question: ' Which of the following is true about typeof operator in JavaScript?',

        option_1: 'The typeof is a unary operator that is placed before its single operand, which can be of any type.',

        option_2: ' Its value is a string indicating the data type of the operand.',

        option_3: ' Both of the above.',

        option_4: ' None of the above.',

        answer: 'option_3'
    },
    {
        question: ' How can you get the total number of arguments passed to a function?',

        option_1: 'Using args.length property',

        option_2: ' Using arguments.length property',

        option_3: ' Both of the above.',

        option_4: ' None of the above.',

        answer: 'option_2'
    },
    {
        question: ' Which of the following is correct about callbacks?',

        option_1: 'A callback is a plain JavaScript function passed to some method as an argument or option.',

        option_2: ' Some callbacks are just events, called to give the user a chance to react when a certain state is triggered.',

        option_3: ' Both of the above.',

        option_4: ' None of the above.',

        answer: 'option_3'
    },
    {
        question: ' Which of the following function of Number object forces a number to display in exponential notation?',

        option_1: 'toExponential()',

        option_2: ' toFixed()',

        option_3: ' toPrecision()',

        option_4: ' toLocaleString()',

        answer: 'option_1'
    },
    {
        question: ' Which of the following function of String object returns the character at the specified index?',

        option_1: 'charAt()',

        option_2: ' charCodeAt()',

        option_3: ' concat()',

        option_4: ' indexOf()',

        answer: 'option_1'
    },
    {
        question: ' Which of the following function of String object returns the characters in a string beginning at the specified location through the specified number of characters?',

        option_1: 'slice()',

        option_2: ' split()',

        option_3: ' substr()',

        option_4: ' search()',

        answer: 'option_3'
    },
    {
        question: 'Which of the following function of String object creates a string to blink as if it were in a <blink> tag?',

        option_1: 'anchor()',

        option_2: ' big()',

        option_3: ' blink()',

        option_4: ' italics()',

        answer: 'option_3'
    },
    {
        question: ' Which of the following function of String object causes a string to be displayed as a subscript, as if it were in a <sub> tag?',

        option_1: 'sup()',

        option_2: ' small()',

        option_3: ' strike()',

        option_4: ' sub()',

        answer: 'option_4'
    },
    {
        question: ' Which of the following function of Array object returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found?',

        option_1: 'indexOf()',

        option_2: ' join()',

        option_3: ' lastIndexOf()',

        option_4: ' map()',

        answer: 'option_3'
    },
    {
        question: ' Which of the following function of Array object adds and/or removes elements from an array?',

        option_1: 'toSource()',

        option_2: ' sort()',

        option_3: ' splice()',

        option_4: ' unshift()',

        answer: 'option_3'
    }
]

let questionCounter = 0;

let point = 0;

function changeValueInsideDiv(id, value) {
    document.getElementById(id, value).innerText = value;
}

function changeValueInsideLabel(forAttribute, value) {
    document.querySelector('label[for=' + forAttribute + ']').innerText = value;
}

function getQuestion() {
    if (questionCounter < questionBank.length) {
        const data = questionBank[questionCounter];
        changeValueInsideDiv('question', data.question);
        changeValueInsideLabel('option_1', data.option_1);
        changeValueInsideLabel('option_2', data.option_2);
        changeValueInsideLabel('option_3', data.option_3);
        changeValueInsideLabel('option_4', data.option_4);
    } else {
        alert('you have completed the quiz with a score of ' + point + 'out of ' + (2 * questionBank.length));
    }
}


function calculatePoint(id) {
    if (questionBank[questionCounter].answer === id)
        point = point + 2;
}



document.getElementById('submit').addEventListener("click", () => {
    const answers = document.querySelectorAll('input[name="quiz"]');
    let isChecked = false;
    answers.forEach((answer) => {
        if (answer.checked) {
            calculatePoint(answer.id);
            questionCounter++;
            getQuestion();
            isChecked = true;
        }
    })
    if (!isChecked) {
        alert('please select an answer');

    }
})
getQuestion();